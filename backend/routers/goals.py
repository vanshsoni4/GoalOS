from fastapi import APIRouter
from sqlalchemy import text
from database import engine

router = APIRouter()


@router.get("/goals")
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


@router.get("/roadmap/{goal_id}")
def get_roadmap(goal_id: int):

    with engine.connect() as conn:

        result = conn.execute(
            text("""
            SELECT step_number,
                   title,
                   description
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


@router.get("/skills/{goal_id}")
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