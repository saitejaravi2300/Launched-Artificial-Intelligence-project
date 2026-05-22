# Intelligent Excuse Generator

AI-powered web application scaffold for generating believable and context-aware excuses.

## Features
- AI-based excuse generation
- Scenario, tone, and language customization
- Proof placeholder generation
- Voice output placeholder
- Save excuse history in MongoDB
- Emergency message scaffold

## Structure
- `backend/` — Express API, MongoDB persistence, OpenAI integration stub
- `frontend/` — Vite + React UI with excuse generation form
- `database/` — DB schema and sample data
- `datasets/` — example datasets for future ML/AI work

## Quick start

### Backend

```bash
cd "backend"
npm install
cp .env .env.local
# Fill .env.local with OPENAI_API_KEY and MONGO_URI values
npm run dev
```

### Frontend

```bash
cd "frontend"
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000`.

## Notes
- `backend/services/openaiService.js` uses the OpenAI API when `OPENAI_API_KEY` is set.
- `backend/config/db.js` connects to MongoDB using `MONGO_URI`.
- The app currently includes proof and voice generation placeholders for later provider integration.
