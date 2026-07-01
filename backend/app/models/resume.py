from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.database.db import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    ats_score = Column(Integer)

    skills_found = Column(Text)
    missing_skills = Column(Text)

    user_id = Column(Integer, ForeignKey("users.id"))