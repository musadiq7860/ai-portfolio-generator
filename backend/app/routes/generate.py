from fastapi import APIRouter, UploadFile, File, Form
from app.services.github_service import fetch_github_data
from app.services.pdf_extract import extract_text_from_pdf, extract_linkedin_sections
from app.services.groq_service import generate_portfolio_content
from app.services.cv_generator import generate_cv_pdf
from app.models.schemas import GenerateRequest
from fastapi.responses import Response
import json

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
    user_id: str = Form("anonymous"),
    username: str = Form("user"),
    full_name: str = Form(""),
    linkedin_pdf: UploadFile = File(None)
):
    try:
        linkedin_text = ""
        linkedin_sections = {"full_text": ""}
        if linkedin_pdf is not None and linkedin_pdf.filename:
            pdf_bytes = await linkedin_pdf.read()
            print(f"DEBUG: Processing PDF ({len(pdf_bytes)} bytes)")
            try:
                linkedin_text = extract_text_from_pdf(pdf_bytes)
                linkedin_sections = extract_linkedin_sections(linkedin_text)
                print(f"DEBUG: Extracted LinkedIn sections. Text length: {len(linkedin_text)}")
            except Exception as pdf_err:
                print(f"DEBUG: PDF Extraction Error: {str(pdf_err)}")
                # We can ignore the error if PDF was optional, or return error depending on strictness
                print("WARNING: Ignoring invalid PDF and proceeding without it.")

        print(f"DEBUG: Fetching GitHub data for {github_url}")
        try:
            github_data = await fetch_github_data(github_url)
            if "error" in github_data:
                print(f"DEBUG: GitHub Fetch Error: {github_data['error']}")
                return {"error": f"GitHub Error: {github_data['error']}"}
        except Exception as github_err:
            print(f"DEBUG: GitHub Fetch Exception: {str(github_err)}")
            return {"error": f"GitHub Connection Error: {str(github_err)}"}

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

        print("DEBUG: Generating portfolio content via Groq...")
        try:
            portfolio_content = generate_portfolio_content(
                github_data=github_data,
                linkedin_sections=linkedin_sections,
                onboarding=onboarding
            )
            if not portfolio_content or "error" in portfolio_content:
                err_msg = portfolio_content.get("error", "Unknown Groq error")
                print(f"DEBUG: Groq Service Error: {err_msg}")
                return {"error": f"AI Synthesis Error: {err_msg}"}
        except Exception as groq_err:
            print(f"DEBUG: Groq Service Exception: {str(groq_err)}")
            return {"error": f"AI Engine Connection Error: {str(groq_err)}"}

        portfolio_content["user_id"] = user_id
        portfolio_content["username"] = username
        portfolio_content["name"] = full_name or portfolio_content.get("name", username)
        portfolio_content["role"] = role
        portfolio_content["one_liner"] = one_liner
        portfolio_content["template"] = template
        portfolio_content["contact"] = {
            "github": github_data.get("github_url", ""),
            "avatar": github_data.get("avatar", "")
        }

        print("DEBUG: Portfolio generation successful")
        return portfolio_content
    except Exception as e:
        print(f"CRITICAL ERROR in generate_portfolio: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": f"System Error: {str(e)}"}


@router.post("/cv")
async def generate_cv(
    portfolio: str = Form(...),
    cv_template: str = Form("modern")
):
    portfolio_data = json.loads(portfolio)
    pdf_bytes = generate_cv_pdf(portfolio_data, cv_template)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=cv.pdf"}
    )