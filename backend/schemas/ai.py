from pydantic import BaseModel

class CareerInput(BaseModel):
    skills: str
    interests: str