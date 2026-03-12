from fastapi import APIRouter, HTTPException
from supabase import create_client
import os

router = APIRouter()

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is None:
        url = (os.getenv("SUPABASE_URL") or "").strip()
        key = (os.getenv("SUPABASE_KEY") or "").strip()
        print(f"--- DEBUG: Initializing Supabase Client ---")
        print(f"URL provided: '{url}'")
        print(f"Key present: {bool(key)}")
        if not url or not key:
            raise ValueError(f"REQUIRED: SUPABASE_URL and SUPABASE_KEY. Current URL: '{url}'")
        try:
            _supabase = create_client(url, key)
            print("--- DEBUG: Supabase Client Initialized Successfully ---")
        except Exception as e:
            print(f"--- DEBUG: create_client FAILED with: {str(e)} ---")
            raise e
    return _supabase

@router.post("/save")
async def save_portfolio(portfolio: dict):
    try:
        supabase = get_supabase()
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
        supabase = get_supabase()
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
        supabase = get_supabase()
        # Corrected columns to match actual schema
        result = supabase.table("portfolios").select("username, style, content->name, content->role").execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))