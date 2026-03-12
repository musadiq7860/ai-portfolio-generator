from fastapi import APIRouter
from app.services.github_service import fetch_github_data

router = APIRouter()

@router.get("/repos")
async def get_github_repos(github_url: str):
    data = await fetch_github_data(github_url)
    return data