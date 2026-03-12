import os
from groq import Groq
import json

_groq_client = None

def get_groq_client():
    global _groq_client
    if _groq_client is None:
        key = os.getenv("GROQ_API_KEY")
        if not key:
            raise ValueError("GROQ_API_KEY must be set")
        _groq_client = Groq(api_key=key)
    return _groq_client

def generate_portfolio_content(
    github_data: dict,
    linkedin_sections: dict,
    onboarding: dict
) -> dict:
    client = get_groq_client()
    highlighted = onboarding.get("highlighted_projects", [])
    all_repos = github_data.get("repos", [])

    featured_repos = [r for r in all_repos if r["name"] in highlighted]
    other_repos = [r for r in all_repos if r["name"] not in highlighted]

    prompt = f"""
You are a professional portfolio writer. Generate portfolio content for a developer.

DEVELOPER INFO:
- Name: {github_data.get('name')}
- Role: {onboarding.get('role')}
- One Liner: {onboarding.get('one_liner')}
- Job Target: {onboarding.get('job_target')}
- Skills to Emphasize: {onboarding.get('skills_to_emphasize')}

GITHUB DATA:
- Username: {github_data.get('username')}
- Bio: {github_data.get('bio')}
- All Repos: {json.dumps(all_repos[:15], indent=2)}

LINKEDIN DATA:
{linkedin_sections.get('full_text', '')[:2000]}

FEATURED PROJECTS (write detailed case studies for these):
{json.dumps(featured_repos, indent=2)}

OTHER PROJECTS (write 1-2 sentence descriptions for these):
{json.dumps(other_repos[:10], indent=2)}

Generate a JSON response with this exact structure:
{{
    "bio": "Professional 3-4 sentence bio paragraph",
    "skills": ["skill1", "skill2", ...],
    "suggested_rate": "$X-Y/hour",
    "featured_projects": [
        {{
            "name": "project name",
            "description": "full case study paragraph",
            "technologies": ["tech1", "tech2"],
            "github_url": "url",
            "is_featured": true
        }}
    ],
    "other_projects": [
        {{
            "name": "project name",
            "description": "1-2 sentence description",
            "technologies": ["tech1"],
            "github_url": "url",
            "is_featured": false
        }}
    ],
    "experience": [
        {{
            "title": "job title",
            "company": "company name",
            "duration": "date range",
            "description": "what they did"
        }}
    ],
    "education": [
        {{
            "degree": "degree name",
            "institution": "school name",
            "year": "graduation year"
        }}
    ]
}}

Return ONLY the JSON. No extra text.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=3000
    )

    raw = response.choices[0].message.content
    raw = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(raw)