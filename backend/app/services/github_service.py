import httpx
import os
from typing import List

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

async def fetch_github_data(github_url: str) -> dict:
    username = github_url.rstrip("/").split("/")[-1]
    
    async with httpx.AsyncClient() as client:
        user_res = await client.get(
            f"https://api.github.com/users/{username}",
            headers=headers
        )
        user_data = user_res.json()
        
        repos_res = await client.get(
            f"https://api.github.com/users/{username}/repos?sort=updated&per_page=30",
            headers=headers
        )
        repos_data = repos_res.json()
    
    repos = []
    for repo in repos_data:
        if not repo.get("fork"):
            repos.append({
                "name": repo.get("name"),
                "description": repo.get("description") or "",
                "languages": repo.get("language") or "Not specified",
                "stars": repo.get("stargazers_count"),
                "github_url": repo.get("html_url"),
                "topics": repo.get("topics", []),
            })
    
    return {
        "username": username,
        "name": user_data.get("name") or username,
        "bio": user_data.get("bio") or "",
        "avatar": user_data.get("avatar_url"),
        "location": user_data.get("location") or "",
        "repos": repos
    }

async def fetch_repo_languages(username: str, repo_name: str) -> List[str]:
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://api.github.com/repos/{username}/{repo_name}/languages",
            headers=headers
        )
        languages = res.json()
    return list(languages.keys())