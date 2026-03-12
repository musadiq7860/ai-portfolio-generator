from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    print("WARNING: Supabase URL or Key not found in Environment Variables")
    # We delay raising error if we want it to start, but Supabase client needs it
    # For now, let's keep it but at least we know why it fails
    if not supabase_url: supabase_url = "https://placeholder.supabase.co"
    if not supabase_key: supabase_key = "placeholder"

supabase = create_client(supabase_url, supabase_key)

@router.post("/save")
async def save_portfolio(portfolio: dict):
    try:
        result = supabase.table("portfolios").upsert({
            "user_id": portfolio.get("user_id"),
            "username": portfolio.get("username"),
            "style": portfolio.get("style"),
            "content": portfolio.get("content"),
            "github_data": portfolio.get("github_data"),
            "focus_role": portfolio.get("focus_role"),
            "target_job": portfolio.get("target_job")
        }).execute()
        return {"message": "Portfolio saved successfully", "data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{username}")
async def get_portfolio(username: str):
    try:
        result = supabase.table("portfolios").select("*").eq(
            "username", username
        ).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return result.data
    except Exception as e:
        raise HTTPException(status_code=404, detail="Portfolio not found")

@router.get("/")
async def get_all_portfolios():
    try:
        result = supabase.table("portfolios").select("username, template, data->name, data->role").execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))