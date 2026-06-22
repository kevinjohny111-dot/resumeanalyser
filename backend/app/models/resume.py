from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    ats_score = Column(Integer)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )