import httpx
import os
from typing import List

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("INFO: GITHUB_TOKEN not found in Environment Variables (optional)")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

async def fetch_github_data(github_url: str) -> dict:
    # Improved parsing to handle queries and trailing slashes
    clean_url = github_url.split('?')[0].split('#')[0].rstrip('/')
    username = clean_url.split("/")[-1]
    
    # Prepare headers safely
    request_headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN and GITHUB_TOKEN != "None":
        request_headers["Authorization"] = f"token {GITHUB_TOKEN}"
    
    try:
        async with httpx.AsyncClient() as client:
            user_res = await client.get(
                f"https://api.github.com/users/{username}",
                headers=request_headers,
                timeout=10.0
            )
            if user_res.status_code != 200:
                return {"error": f"GitHub user not found or API error: {user_res.status_code}"}
            
            user_data = user_res.json()
            
            repos_res = await client.get(
                f"https://api.github.com/users/{username}/repos?sort=updated&per_page=30",
                headers=request_headers,
                timeout=10.0
            )
            if repos_res.status_code != 200:
                return {"error": f"Error fetching repos: {repos_res.status_code}"}
            
            repos_data = repos_res.json()
        
        if not isinstance(repos_data, list):
            return {"error": "Unexpected response format from GitHub API"}
            
        repos = []
        for repo in repos_data:
            if not repo.get("fork"):
                repos.append({
                    "name": repo.get("name"),
                    "description": repo.get("description") or "",
                    "language": repo.get("language") or "Not specified",
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
    except Exception as e:
        print(f"Error in fetch_github_data: {e}")
        return {"error": str(e)}

async def fetch_repo_languages(username: str, repo_name: str) -> List[str]:
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://api.github.com/repos/{username}/{repo_name}/languages",
            headers=headers
        )
        languages = res.json()
    return list(languages.keys())