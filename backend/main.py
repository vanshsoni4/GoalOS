from routers.auth import router as auth_router
from fastapi import FastAPI
from sqlalchemy import text
from database import engine
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Header
from schemas.user import (
    UserRegister,
    UserLogin,
    UserGoal,
    UserProgress
)
from routers.goals import router as goals_router
from routers.progress import router as progress_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(progress_router)
app.include_router(goals_router)
app.include_router(auth_router)
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = "goalos_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt
def verify_token(token):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except:
        return None



@app.get("/")
def home():
    return {"message": "GoalOS Backend Running"}







@app.get("/me")
def get_current_user(
    authorization: str = Header(None)
):
    print("Authorization =", authorization)
    if authorization is None:
        return {
            "message": "Token Missing"
        }

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if payload is None:
        return {
            "message": "Invalid Token"
        }

    user_id = payload["user_id"]

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT id,
                   name,
                   email,
                   age,
                   education
            FROM users
            WHERE id = :id
            """),
            {"id": user_id}
        )

        user = result.fetchone()

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "age": user.age,
            "education": user.education
        }