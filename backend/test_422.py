import requests

url = "https://musadiq7860-ai-portfolio-backend.hf.space/api/generate/portfolio"
files = {
    'linkedin_pdf': ('test.pdf', b'%PDF-1.4\n1 0 R', 'application/pdf')
}
data = {
    'github_url': 'https://github.com/musadiq7860',
    'role': 'Full Stack Developer',
    'job_target': ' ', # space
    'skills_to_emphasize': ' ', # space
    'one_liner': ' ', # space
    'highlighted_projects': '["P1"]',
    'template': 'Minimal',
    'user_id': 'fc5fcdcf-1d89-4171-8bc6-94aa723330f6',
    'username': 'musadiq',
    'full_name': ' ' # space
}

print("Sending simulated space-padded request to HF Space...")
response = requests.post(url, data=data, files=files)
print("Status Code:", response.status_code)
print("Response Body:", response.text)
