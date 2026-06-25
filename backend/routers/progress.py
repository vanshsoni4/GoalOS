from fastapi import APIRouter
from sqlalchemy import text
from database import engine
from schemas.user import UserGoal, UserProgress

router = APIRouter()


@router.post("/user-goal")
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


@router.post("/progress")
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


@router.get("/progress/{user_id}")
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