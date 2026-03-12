import os
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader

TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "../templates")

def generate_cv_pdf(portfolio: dict, cv_template: str = "modern") -> bytes:
    env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    
    template_file = f"cv_{cv_template}.html"
    
    try:
        template = env.get_template(template_file)
    except:
        template = env.get_template("cv_modern.html")
    
    html_content = template.render(
        name=portfolio.get("name"),
        role=portfolio.get("role"),
        one_liner=portfolio.get("one_liner"),
        bio=portfolio.get("bio"),
        skills=portfolio.get("skills", []),
        featured_projects=portfolio.get("featured_projects", []),
        other_projects=portfolio.get("other_projects", []),
        experience=portfolio.get("experience", []),
        education=portfolio.get("education", []),
        contact=portfolio.get("contact", {}),
        suggested_rate=portfolio.get("suggested_rate", "")
    )
    
    pdf_bytes = HTML(string=html_content).write_pdf()
    return pdf_bytes