from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
from pydantic import BaseModel

class UserLogin(BaseModel):
    email: str
    password: str