from pydantic import BaseModel


class RegisterSchema(BaseModel):
    full_name: str
    email: str
    password: str


class LoginSchema(BaseModel):
    email: str
    password: str