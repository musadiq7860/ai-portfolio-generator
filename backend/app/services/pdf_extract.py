import fitz
import re

def extract_text_from_pdf(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text.strip()

def clean_linkedin_text(text: str) -> str:
    lines = text.split("\n")
    cleaned = []
    for line in lines:
        line = line.strip()
        if len(line) > 2:
            cleaned.append(line)
    return "\n".join(cleaned)

def extract_linkedin_sections(text: str) -> dict:
    sections = {
        "full_text": text,
        "experience": [],
        "education": [],
        "skills": [],
        "certifications": []
    }

    lines = text.split("\n")
    current_section = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        lower = line.lower()

        if "experience" in lower:
            current_section = "experience"
        elif "education" in lower:
            current_section = "education"
        elif "skills" in lower:
            current_section = "skills"
        elif "certification" in lower or "license" in lower:
            current_section = "certifications"
        elif current_section:
            sections[current_section].append(line)

    return sections