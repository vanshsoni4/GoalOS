from fastapi import APIRouter
from sqlalchemy import text
from database import engine
from schemas.user import UserRegister, UserLogin
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = "goalos_secret_key_2026"
ALGORITHM = "HS256"


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


@router.post("/register")
def register(user: UserRegister):

    try:
        hashed_password = pwd_context.hash(user.password)

        with engine.connect() as conn:

            conn.execute(
                text("""
                INSERT INTO users
                (name, email, password_hash, age, education)
                VALUES
                (:name, :email, :password, :age, :education)
                """),
                {
                    "name": user.name,
                    "email": user.email,
                    "password": hashed_password,
                    "age": user.age,
                    "education": user.education
                }
            )

            conn.commit()

        return {
            "message": "User Registered Successfully"
        }

    except Exception as e:
        return {
            "error": str(e)
        }


@router.post("/login")
def login(user: UserLogin):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT *
            FROM users
            WHERE email = :email
            """),
            {"email": user.email}
        )

        db_user = result.fetchone()

        if db_user is None:
            return {
                "message": "User Not Found"
            }

        if not pwd_context.verify(
            user.password,
            db_user.password_hash
        ):
            return {
                "message": "Invalid Password"
            }

        token = create_access_token(
            {"user_id": db_user.id}
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }