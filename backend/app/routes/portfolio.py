from fastapi import APIRouter, HTTPException, Response
from supabase import create_client
from app.services.cv_generator import generate_cv_pdf
import os
import traceback

router = APIRouter()

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is None:
        url = (os.getenv("SUPABASE_URL") or "").strip()
        key = (os.getenv("SUPABASE_KEY") or "").strip()
        if not url or not key:
            raise ValueError(f"REQUIRED: SUPABASE_URL and SUPABASE_KEY. Current URL: '{url}'")
        _supabase = create_client(url, key)
    return _supabase

@router.post("/save")
async def save_portfolio(portfolio: dict):
    try:
        supabase = get_supabase()
        username = portfolio.get("username")
        
        existing = supabase.table("portfolios").select("id").eq("username", username).execute()
        
        payload = {
            "style": portfolio.get("style"),
            "content": portfolio.get("content"),
            "github_data": portfolio.get("github_data"),
            "focus_role": portfolio.get("focus_role"),
            "target_job": portfolio.get("target_job")
        }
        
        if existing.data:
            result = supabase.table("portfolios").update(payload).eq("username", username).execute()
        else:
            payload["user_id"] = portfolio.get("user_id")
            payload["username"] = username
            result = supabase.table("portfolios").insert(payload).execute()
            
        return {"message": "Portfolio saved successfully", "data": result.data}
    except Exception as e:
        print(f"[SAVE ERROR] {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{username}/cv")
async def get_portfolio_cv(username: str, cv_template: str = "modern"):
    try:
        supabase = get_supabase()
        result = supabase.table("portfolios").select("*").eq("username", username).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Portfolio not found")

        portfolio_data = result.data.get("content", {})
        portfolio_data["name"] = portfolio_data.get("name", username)
        portfolio_data["role"] = result.data.get("focus_role", "Developer")
        portfolio_data["one_liner"] = portfolio_data.get("one_liner", "")

        pdf_bytes = generate_cv_pdf(portfolio_data, cv_template)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={username}_cv.pdf"}
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"[CV ERROR] {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{username}")
async def get_portfolio(username: str):
    try:
        supabase = get_supabase()
        result = supabase.table("portfolios").select("*").eq(
            "username", username
        ).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return result.data
    except HTTPException:
        raise
    except Exception as e:
        print(f"[GET PORTFOLIO ERROR] {traceback.format_exc()}")
        raise HTTPException(status_code=404, detail="Portfolio not found")

@router.get("/")
async def get_all_portfolios():
    try:
        supabase = get_supabase()
        result = supabase.table("portfolios").select("username, style, content->name, content->role").execute()
        return result.data
    except Exception as e:
        print(f"[LIST ERROR] {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))