import requests

url = "https://musadiq7860-ai-portfolio-backend.hf.space/api/generate/portfolio"
files = {
    'linkedin_pdf': ('test.pdf', b'%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Count 1\n/Kids [ 3 0 R ]\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [ 0 0 612 792 ]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 0\n>>\nstream\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000057 00000 n \n0000000114 00000 n \n0000000213 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n262\n%%EOF', 'application/pdf')
}
data = {
    'github_url': 'https://github.com/musadiq7860',
    'role': 'Full Stack Developer',
    'job_target': 'Stripe',
    'skills_to_emphasize': 'React, Node.js',
    'one_liner': 'Building fast stuff',
    'highlighted_projects': '["AI Portfolio Generator"]',
    'template': 'Minimal',
    'user_id': 'fc5fcdcf-1d89-4171-8bc6-94aa723330f6',
    'username': 'musadiq',
    'full_name': 'Musadiq'
}

print("Sending request to HF Space...")
response = requests.post(url, data=data, files=files)
print("Status Code:", response.status_code)
print("Response Body:", response.text)
