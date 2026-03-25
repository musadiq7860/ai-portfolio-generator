import os
import re
import json
import traceback
from groq import Groq

_groq_client = None

def get_groq_client():
    global _groq_client
    if _groq_client is None:
        key = os.getenv("GROQ_API_KEY")
        if not key:
            raise ValueError("GROQ_API_KEY must be set")
        _groq_client = Groq(api_key=key)
    return _groq_client

def extract_json_from_text(text):
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r'^```(?:json)?\s*\n?', '', text)
        text = re.sub(r'\n?```\s*$', '', text)
        text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass
    raise ValueError(f"Could not extract valid JSON from AI response. Response starts with: {text[:200]}")

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

    prompt = f"""You are a professional portfolio writer. Generate portfolio content for a developer.

DEVELOPER INFO:
- Name: {onboarding.get('full_name') or github_data.get('name') or github_data.get('username')}
- Role: {onboarding.get('role')}
- One Liner: {onboarding.get('one_liner')}
- Job Target: {onboarding.get('job_target')}
- Skills to Emphasize: {onboarding.get('skills_to_emphasize')}

GITHUB DATA:
- Username: {github_data.get('username')}
- Bio: {github_data.get('bio')}
- All Repos: {json.dumps(all_repos[:15], indent=2)}

LINKEDIN DATA:
Full Document Context:
{linkedin_sections.get('full_text', '')}

Extracted LinkedIn Education History:
{json.dumps(linkedin_sections.get('education', []), indent=2)}

Extracted LinkedIn Experience History:
{json.dumps(linkedin_sections.get('experience', []), indent=2)}

FEATURED PROJECTS (write detailed case studies for these):
{json.dumps(featured_repos, indent=2)}

OTHER PROJECTS (write 1-2 sentence descriptions for these):
{json.dumps(other_repos[:10], indent=2)}

Generate a JSON response with this exact structure:
{{
    "bio": "Professional 3-4 sentence bio paragraph",
    "skills": ["skill1", "skill2"],
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
    ],
    "contact_info": {{
        "email": "extracted email or empty string",
        "linkedin": "extracted linkedin url or empty string"
    }}
}}

Return ONLY the JSON object. No markdown, no extra text, no explanation."""

    try:
        print("[GROQ] Sending request to Llama 3.3 70B...")
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=3000
        )
        raw = response.choices[0].message.content
        print(f"[GROQ] Raw response length: {len(raw)} chars")
        print(f"[GROQ] Response preview: {raw[:300]}")

        result = extract_json_from_text(raw)

        required_keys = ["bio", "skills", "featured_projects"]
        for key in required_keys:
            if key not in result:
                result[key] = [] if key != "bio" else "Professional developer."

        if "other_projects" not in result:
            result["other_projects"] = []
        if "experience" not in result:
            result["experience"] = []
        if "education" not in result:
            result["education"] = []
        if "suggested_rate" not in result:
            result["suggested_rate"] = ""
            
        result["contact_details"] = result.get("contact_info", {})

        print(f"[GROQ] Parsed successfully: {len(result.get('featured_projects', []))} featured, {len(result.get('other_projects', []))} other")
        return result

    except Exception as e:
        print(f"[GROQ] ERROR: {traceback.format_exc()}")
        raise ValueError(f"AI generation failed: {str(e)}")