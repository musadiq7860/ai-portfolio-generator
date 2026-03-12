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
    job_target: str = Form(...),
    skills_to_emphasize: str = Form(...),
    one_liner: str = Form(...),
    highlighted_projects: str = Form(...),
    template: str = Form(...),
    user_id: str = Form(...),
    username: str = Form(...),
    linkedin_pdf: UploadFile = File(...)
):
    pdf_bytes = await linkedin_pdf.read()
    linkedin_text = extract_text_from_pdf(pdf_bytes)
    linkedin_sections = extract_linkedin_sections(linkedin_text)

    github_data = await fetch_github_data(github_url)

    onboarding = {
        "github_url": github_url,
        "role": role,
        "job_target": job_target,
        "skills_to_emphasize": skills_to_emphasize,
        "one_liner": one_liner,
        "highlighted_projects": json.loads(highlighted_projects),
        "template": template
    }

    portfolio_content = generate_portfolio_content(
        github_data=github_data,
        linkedin_sections=linkedin_sections,
        onboarding=onboarding
    )

    portfolio_content["user_id"] = user_id
    portfolio_content["username"] = username
    portfolio_content["role"] = role
    portfolio_content["one_liner"] = one_liner
    portfolio_content["template"] = template
    portfolio_content["contact"] = {
        "github": github_data.get("github_url", ""),
        "avatar": github_data.get("avatar", "")
    }

    return portfolio_content


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