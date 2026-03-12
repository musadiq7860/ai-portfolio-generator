from dotenv import load_dotenv
load_dotenv()

import os
print("--- BACKEND STARTUP DIAGNOSTICS ---")
print(f"GROQ_API_KEY present: {bool(os.getenv('GROQ_API_KEY'))}")
print(f"SUPABASE_URL present: {bool(os.getenv('SUPABASE_URL'))}")
print(f"SUPABASE_KEY present: {bool(os.getenv('SUPABASE_KEY'))}")
print("-----------------------------------")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import github, generate, portfolio

app = FastAPI(title="AI Portfolio Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(github.router, prefix="/api/github", tags=["GitHub"])
app.include_router(generate.router, prefix="/api/generate", tags=["Generate"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])

@app.get("/")
def root():
    return {"message": "AI Portfolio Generator API is running"}