from fastapi import FastAPI
from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
app = FastAPI()
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

@app.get("/")
def home():
    return {"message": "GoalOS Backend Running"}


@app.get("/goals")
def get_goals():
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT id, goal_name, category FROM goals")
        )

        return [
            {
                "id": row.id,
                "goal_name": row.goal_name,
                "category": row.category
            }
            for row in result
        ]


@app.get("/roadmap/{goal_id}")
def get_roadmap(goal_id: int):
    with engine.connect() as conn:
        result = conn.execute(
            text("""
            SELECT step_number, title, description
            FROM roadmap_nodes
            WHERE goal_id = :goal_id
            ORDER BY step_number
            """),
            {"goal_id": goal_id}
        )

        return [
            {
                "step": row.step_number,
                "title": row.title,
                "description": row.description
            }
            for row in result
        ]


@app.get("/skills/{goal_id}")
def get_skills(goal_id: int):
    with engine.connect() as conn:
        result = conn.execute(
            text("""
            SELECT s.id,
                   s.skill_name,
                   gs.importance
            FROM skills s
            JOIN goal_skills gs
            ON s.id = gs.skill_id
            WHERE gs.goal_id = :goal_id
            """),
            {"goal_id": goal_id}
        )

        return [
            {
                "id": row.id,
                "skill_name": row.skill_name,
                "importance": row.importance
            }
            for row in result
        ]


@app.post("/register")
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

        return {"message": "User Registered Successfully"}

    except Exception as e:
        return {"error": str(e)}
@app.post("/login")
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
@app.post("/user-goal")
def select_goal(data: UserGoal):

    with engine.connect() as conn:

        conn.execute(
            text("""
            INSERT INTO user_goals
            (user_id, goal_id, progress)
            VALUES
            (:user_id, :goal_id, 0)
            """),
            {
                "user_id": data.user_id,
                "goal_id": data.goal_id
            }
        )

        conn.commit()

    return {
        "message": "Goal Selected Successfully"
    }
@app.post("/progress")
def update_progress(data: UserProgress):

    with engine.connect() as conn:

        conn.execute(
            text("""
            INSERT INTO user_progress
            (user_id, roadmap_node_id, completed)
            VALUES
            (:user_id, :roadmap_node_id, TRUE)
            """),
            {
                "user_id": data.user_id,
                "roadmap_node_id": data.roadmap_node_id
            }
        )

        conn.commit()

    return {
        "message": "Progress Updated Successfully"
    }
@app.get("/progress/{user_id}")
def get_progress(user_id: int):

    with engine.connect() as conn:

        completed = conn.execute(
            text("""
            SELECT COUNT(*)
            FROM user_progress
            WHERE user_id = :user_id
            AND completed = TRUE
            """),
            {"user_id": user_id}
        ).scalar()

        total = conn.execute(
            text("""
            SELECT COUNT(*)
            FROM roadmap_nodes
            """)
        ).scalar()

        percentage = 0

        if total > 0:
            percentage = round((completed / total) * 100, 2)

        return {
            "completed": completed,
            "total": total,
            "percentage": percentage
        }