from fastapi import APIRouter
from schemas.ai import CareerInput

router = APIRouter()

@router.post("/career-advice")
def career_advice(data: CareerInput):

    skills = data.skills.lower()
    interests = data.interests.lower()

    if "python" in skills and "sql" in skills:
        return {
            "career": "Data Analyst",
            "reason": "Strong foundation in data analysis.",
            "next_skills": [
                "Power BI",
                "Statistics",
                "Excel Advanced"
            ]
        }

    if "python" in skills and "machine learning" in interests:
        return {
            "career": "Data Scientist",
            "reason": "Interest aligns with ML and AI.",
            "next_skills": [
                "Machine Learning",
                "Deep Learning",
                "MLOps"
            ]
        }

    return {
        "career": "Software Engineer",
        "reason": "General programming background detected.",
        "next_skills": [
            "DSA",
            "System Design",
            "Backend Development"
        ]
    }