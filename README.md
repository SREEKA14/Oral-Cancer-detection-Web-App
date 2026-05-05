# Oral Cancer Detection using Deep Learning

## Overview
Oral Cancer Detection is an AI-powered healthcare web application developed to assist in early screening of oral cancer from oral cavity images. The system uses an ensemble of multiple deep learning models to improve prediction robustness and accuracy. It provides automated prediction, confidence score, medical recommendations, and downloadable diagnostic reports.

This project combines Deep Learning, Backend APIs, Databases, and Frontend Web Development into a complete end-to-end healthcare solution.



## Features
- User Registration
- Secure Login Authentication
- Oral Image Upload
- AI-based Oral Cancer Prediction
- Confidence Score Output
- Medical Recommendations
- Downloadable PDF Report
- Prediction Logging
- Clean Healthcare UI
- Full-stack Web Application



## Deep Learning Models Used
This project uses an ensemble learning approach combining:

1. EfficientNet-B4  
2. DenseNet201  
3. InceptionV3  
4. Swin Transformer  

### Ensemble Method
Weighted ensemble prediction is used to combine outputs from all four models, improving overall reliability and reducing prediction bias from individual models.

---

## Model Performance
Ensemble Results:

- Accuracy: **99%**
- Precision: **100%**
- Recall: **98%**
- F1 Score: **98.99%**
- ROC AUC: **99.56%**

Note: Results are based on the experimental dataset used for this mini project.

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- FastAPI
- Python
- PyTorch

### Databases
- PostgreSQL (User Authentication)
- MongoDB (Prediction Logging)

### Report Generation
- FPDF

---

## Project Workflow
1. User registers or logs in.
2. User uploads an oral image.
3. Backend preprocesses image.
4. Ensemble deep learning models analyze image.
5. Prediction result is generated.
6. Confidence score is calculated.
7. Medical recommendation is provided.
8. Downloadable PDF report is generated.

---

## Folder Structure

```text
Oral Cancer Detection/
│
├── backend/
│   ├── app/
│   ├── trained_models/
│   ├── uploads/
│   ├── reports/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Environment Variables
Create:

```text
backend/.env
```

Add:

```env
DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/oral_cancer_db
```

---

## Trained Model Files
Place trained model weights inside:

```text
backend/trained_models/
```

Required files:

- efficientnet_b4.pth
- densenet201.pth
- inception_v3.pth
- swin_transformer.pth
- ensemble.pkl
- class_map.json


## Author
Developed as a Mini Project for academic purposes.
