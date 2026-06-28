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

@router.get("/user-goal/{user_id}")
def get_user_goal(user_id: int):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT g.id,
                   g.goal_name,
                   g.category,
                   ug.progress
            FROM user_goals ug
            JOIN goals g
              ON ug.goal_id = g.id
            WHERE ug.user_id = :user_id
            ORDER BY ug.id DESC
            LIMIT 1
            """),
            {"user_id": user_id}
        )

        goal = result.fetchone()

        if not goal:
            return {
                "message": "No Goal Selected"
            }

        return {
            "goal_id": goal.id,
            "goal_name": goal.goal_name,
            "category": goal.category,
            "progress": goal.progress
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