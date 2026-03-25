from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.github_service import fetch_github_data
from app.services.pdf_extract import extract_text_from_pdf, extract_linkedin_sections
from app.services.groq_service import generate_portfolio_content
from app.services.cv_generator import generate_cv_pdf
from fastapi.responses import Response
import json
import traceback

router = APIRouter()

@router.post("/portfolio")
async def generate_portfolio(
    github_url: str = Form(...),
    role: str = Form(...),
    job_target: str = Form(""),
    skills_to_emphasize: str = Form(""),
    one_liner: str = Form(""),
    highlighted_projects: str = Form("[]"),
    template: str = Form("Minimal"),
    user_id: str = Form(...),
    username: str = Form(...),
    full_name: str = Form(""),
    linkedin_pdf: UploadFile = File(...)
):
    try:
        print(f"[GENERATE] Starting for user: {username}")

        pdf_bytes = await linkedin_pdf.read()
        print(f"[GENERATE] PDF read: {len(pdf_bytes)} bytes")

        linkedin_text = extract_text_from_pdf(pdf_bytes)
        linkedin_sections = extract_linkedin_sections(linkedin_text)
        print(f"[GENERATE] LinkedIn extracted: {len(linkedin_text)} chars")

        github_data = await fetch_github_data(github_url)
        if "error" in github_data:
            print(f"[GENERATE] GitHub error: {github_data['error']}")
            raise HTTPException(status_code=400, detail=f"GitHub error: {github_data['error']}")
        print(f"[GENERATE] GitHub fetched: {len(github_data.get('repos', []))} repos")

        onboarding = {
            "github_url": github_url,
            "role": role,
            "job_target": job_target,
            "skills_to_emphasize": skills_to_emphasize,
            "one_liner": one_liner,
            "highlighted_projects": json.loads(highlighted_projects),
            "template": template,
            "full_name": full_name
        }

        print("[GENERATE] Calling Groq AI...")
        portfolio_content = generate_portfolio_content(
            github_data=github_data,
            linkedin_sections=linkedin_sections,
            onboarding=onboarding
        )
        print(f"[GENERATE] AI generated keys: {list(portfolio_content.keys())}")

        portfolio_content["user_id"] = user_id
        portfolio_content["username"] = username
        portfolio_content["name"] = full_name or portfolio_content.get("name", username)
        portfolio_content["role"] = role
        portfolio_content["one_liner"] = one_liner
        portfolio_content["template"] = template
        portfolio_content["contact"] = {
            "github": github_data.get("github_url", github_url),
            "avatar": github_data.get("avatar", "")
        }

        print(f"[GENERATE] Success for {username}")
        return portfolio_content

    except HTTPException:
        raise
    except json.JSONDecodeError as e:
        print(f"[GENERATE] JSON parse error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        print(f"[GENERATE] CRITICAL ERROR: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


@router.post("/cv")
async def generate_cv(
    portfolio: str = Form(...),
    cv_template: str = Form("modern")
):
    try:
        portfolio_data = json.loads(portfolio)
        pdf_bytes = generate_cv_pdf(portfolio_data, cv_template)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=cv.pdf"}
        )
    except Exception as e:
        print(f"[CV] Error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"CV generation failed: {str(e)}")