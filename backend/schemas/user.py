from pydantic import BaseModel

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    age: int
    education: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserGoal(BaseModel):
    user_id: int
    goal_id: int


class UserProgress(BaseModel):
    user_id: int
    roadmap_node_id: int