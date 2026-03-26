# AI Portfolio & CV Generator

Turn your GitHub profile into a professional portfolio website and downloadable CV in under 60 seconds — powered by AI.

![AI Portfolio Generator](https://ai-portfolio-generator1.vercel.app)

## Live Demo

🔗 **App:** https://ai-portfolio-generator1.vercel.app  
⭐ **GitHub:** https://github.com/musadiq7860/ai-portfolio-generator

---

## What It Does

Paste your GitHub URL, upload your LinkedIn PDF, answer 4 quick questions — and the AI generates:

- A **live public portfolio website** at `yourapp.vercel.app/portfolio/username`
- A **downloadable CV PDF** formatted and ready to send

No design skills needed. No templates to fill manually. The AI reads your actual repos and writes everything for you.

---

## Features

- **AI-generated content** — project descriptions, case studies, bio, skills, suggested hourly rate
- **5 unique portfolio styles** — Terminal, Minimal, Bold, Magazine, Card Grid. No two portfolios look the same
- **Featured projects** — select your top 3 repos to get full case studies. All other repos still appear
- **CV PDF download** — professionally formatted, matches your portfolio style
- **Permanent public link** — share with clients, attach to applications, put in email signature
- **Supabase Auth** — secure email/password signup and login
- **Zero cost stack** — everything runs on free tiers

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI |
| AI | Groq API — Llama 3.3 70B (free tier) |
| GitHub Data | GitHub REST API (free, no key needed) |
| LinkedIn Data | User uploads LinkedIn PDF → PyMuPDF extracts text |
| CV Generation | WeasyPrint + Jinja2 HTML templates |
| Database | Supabase (free tier) |
| Auth | Supabase Auth |
| State Management | Zustand |
| Frontend Deploy | Vercel |
| Backend Deploy | HuggingFace Spaces (Docker) |

---

## How It Works
```
1. User signs up with email
2. Pastes GitHub URL
3. Uploads LinkedIn PDF
4. Fills focus form:
   → Professional title
   → Target job / company goal  
   → Key skills to emphasize
   → Selects top 3 featured projects from repo list
   → Picks portfolio style
5. AI generates all content via Groq (Llama 3.3 70B)
6. Portfolio saved to Supabase
7. Live at yourapp.vercel.app/portfolio/username
8. CV PDF available for download
```

---

## Portfolio Styles

| Style | Description |
|---|---|
| Terminal | Dark theme, code aesthetic, for backend and ML developers |
| Minimal | Clean white, lots of space, for frontend developers |
| Bold | Large typography, colorful, for full stack developers |
| Magazine | Editorial style, for designers and content people |
| Card Grid | Project focused, for open source contributors |

---

## Project Structure
```
ai-portfolio-generator/
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/        # Navbar, ProjectCard, LoadingScreen
│   │   ├── pages/             # Home, Login, Register, Onboarding, Preview, Portfolio
│   │   ├── templates/         # 5 portfolio style components
│   │   ├── lib/               # Supabase client
│   │   └── store/             # Zustand global state
│   └── package.json
├── backend/                   # FastAPI
│   ├── app/
│   │   ├── routes/            # github, generate, portfolio
│   │   ├── services/          # github_service, pdf_extract, groq_service, cv_generator
│   │   ├── models/            # Pydantic schemas
│   │   └── templates/         # CV HTML templates (modern, minimal, classic, bold)
│   ├── requirements.txt
│   └── Dockerfile
└── README.md
```

---

## Local Setup

### Backend
```bash
cd backend
pip install -r app/requirements.txt
```

Create `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
GITHUB_TOKEN=your_github_token
```
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
```bash
npm run dev
```

Open `http://localhost:5173`

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel — root directory: `frontend` |
| Backend | HuggingFace Spaces — Docker, port 7860 |

---

## Environment Variables

### Frontend (Vercel)

| Key | Value |
|---|---|
| VITE_API_URL | Your HuggingFace Space URL |
| VITE_SUPABASE_URL | Your Supabase project URL |
| VITE_SUPABASE_ANON_KEY | Your Supabase anon key |

### Backend (HuggingFace Secrets)

| Key | Value |
|---|---|
| GROQ_API_KEY | From console.groq.com |
| SUPABASE_URL | Your Supabase project URL |
| SUPABASE_KEY | Your Supabase anon key |
| GITHUB_TOKEN | From GitHub Developer Settings |

---

## Built By

**Muhammad Musadiq** — Full Stack AI Developer  
🔗 GitHub: [@musadiq7860](https://github.com/musadiq7860)  
🌐 Live: [ai-portfolio-generator1.vercel.app](https://ai-portfolio-generator1.vercel.app)

---

⭐ Star this repo if you found it useful
