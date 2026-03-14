from pydantic import BaseModel
from typing import List, Optional

class OnboardingData(BaseModel):
    github_url: str
    role: str
    job_target: str
    skills_to_emphasize: str
    one_liner: str
    highlighted_projects: List[str]
    template: str

class ProjectData(BaseModel):
    name: str
    description: str
    technologies: List[str]
    github_url: str
    is_featured: bool

class PortfolioData(BaseModel):
    user_id: str
    username: str
    name: str
    bio: str
    role: str
    one_liner: str
    skills: List[str]
    projects: List[ProjectData]
    experience: List[dict]
    education: List[dict]
    contact: dict
    template: str
    suggested_rate: str

class GenerateRequest(BaseModel):
    onboarding: OnboardingData
    linkedin_text: str
    user_id: str
    username: str

class CVRequest(BaseModel):
    portfolio: PortfolioData
    cv_template: str