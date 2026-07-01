from fastapi import FastAPI
from app.utils.security import hash_password
from app.schemas.user import UserLogin
from app.utils.security import verify_password
from app.schemas.user import UserCreate
from app.database.db import engine, Base
from app.models.user import User
from sqlalchemy.orm import Session
from fastapi import Depends
from app.utils.auth import create_access_token
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from app.utils.auth import verify_token
from fastapi import UploadFile, File
import os
from fastapi.middleware.cors import CORSMiddleware
from app.utils.pdf import extract_text
from app.utils.analyser import analyze_resume
from app.schemas.job import JobDescription
from app.utils.analyser import analyze_job_match
from app.models.resume import Resume
from fastapi.security import OAuth2PasswordRequestForm
from app.database.db import get_db
from fastapi import Form
import json

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://13.220.97.216:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "AI Resume Analyzer",
        "status": "running"
    }


@app.get("/about")
def about():
    return {
        "developer": "Kevin",
        "version": "1.0"
    }





@app.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User created"
    }

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if db_user is None:
        return {
            "message": "User not found"
        }

    if not verify_password(
        form_data.password,
        db_user.password_hash
    ):
        return {
            "message": "Invalid password"
        }

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@app.get("/me")
def get_me(token: str):
    email = verify_token(token)

    if email is None:
        return {
            "message": "Invalid token"
        }

    return {
        "email": email
    }

@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    email = verify_token(token)

    if email is None:
        return {
            "message": "Invalid token"
        }

    db_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    resume_text = extract_text(file_path)

    result = analyze_job_match(
        resume_text,
        job_description
    )

    resume = Resume(
     filename=file.filename,
     ats_score=result["ats_score"],
     skills_found=json.dumps(result["skills_found"]),
     missing_skills=json.dumps(result["missing_skills"]),
     user_id=db_user.id
  )

    db.add(resume)
    db.commit()

    return {
        "message": "Resume uploaded",
        "ats_score": result["ats_score"],
        "skills_found": result["skills_found"],
        "missing_skills": result["missing_skills"]
    }
@app.get("/extract-text")
def get_text():

    text = extract_text(
        "uploads/resume.pdf"
    )

    return {
        "text": text
    }

@app.get("/analyze-resume")
def analyze():

    text = extract_text(
        "uploads/resume.pdf"
    )

    result = analyze_resume(text)

    return result

@app.post("/analyze-job-match")
def analyze_job(
    job: JobDescription
):
    resume_text = extract_text(
        "uploads/resume.pdf"
    )

    result = analyze_job_match(
        resume_text,
        job.job_description
    )

    return result

@app.get("/my-resumes")
def get_resumes(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    email = verify_token(token)

    print("EMAIL:", email)

    if email is None:
        return {
            "message": "Invalid token"
        }

    db_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    print("DB USER:", db_user)

    if db_user is None:
        return {
            "message": "User not found"
        }

    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == db_user.id)
        .all()
    )

    return resumes
@app.get("/resume/{resume_id}")
def get_resume(
    resume_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    email = verify_token(token)

    if email is None:
        return {
            "message": "Invalid token"
        }

    db_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if db_user is None:
        return {
            "message": "User not found"
        }

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == db_user.id
        )
        .first()
    )

    if resume is None:
        return {
            "message": "Resume not found"
        }

    return {
     "id": resume.id,
     "filename": resume.filename,
     "ats_score": resume.ats_score,
     "skills_found": json.loads(resume.skills_found),
     "missing_skills": json.loads(resume.missing_skills)
     }
@app.delete("/resume/{resume_id}")
def delete_resume(
    resume_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    email = verify_token(token)

    db_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == db_user.id
        )
        .first()
    )

    if resume is None:
        return {
            "message": "Resume not found"
        }

    db.delete(resume)
    db.commit()

    return {
        "message": "Resume deleted"
    }
