import os
import shutil

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from fastapi.responses import FileResponse
from app.report import generate_report
from app.config import REPORT_DIR

from app.config import UPLOAD_DIR
from app.utils import predict_oral_cancer

from app.database import (
    Base,
    engine,
    get_db,
    prediction_collection
)

from app.models import User
from app.schemas import RegisterSchema, LoginSchema
from app.auth import (
    hash_password,
    verify_password,
    create_access_token
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oral Cancer Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API running successfully"}


@app.post("/register")
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        full_name=data.full_name,
        email=data.email,
        password=hash_password(data.password)
    )

    db.add(user)
    db.commit()

    return {"message": "Registered successfully"}


@app.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "email": user.email
    })

    return {
        "message": "Login successful",
        "token": token
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    save_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_oral_cancer(save_path)

    prediction_collection.insert_one({
        "file_name": file.filename,
        "prediction": result["prediction"],
        "confidence": result["confidence"]
    })

    return result

@app.post("/generate-report")
def create_report(data: dict):
    filename = generate_report(data)

    filepath = os.path.join(REPORT_DIR, filename)

    return FileResponse(
        filepath,
        media_type="application/pdf",
        filename=filename
    )