# LLD Practice Platform

A small MVP for practicing Low-Level Design problems (Parking Lot, Elevator, etc.) and getting AI-generated feedback.

## Stack
- Frontend: HTML/CSS + EJS (server-rendered)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Feedback: Claude API

## Folder Structure
```
lld-practice-platform/
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── Problem.js
│   └── Submission.js
├── routes/
│   ├── problems.js         # list, detail, submit
│   └── submissions.js      # feedback view
├── utils/
│   └── generateFeedback.js # Claude API call
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── list.ejs
│   ├── submit.ejs
│   └── feedback.ejs
├── public/
│   └── css/style.css
├── seed.js                 # seeds sample problems into MongoDB
├── server.js                # app entry point
├── .env.example
├── AI_USAGE.md
└── package.json
```

## Setup & Run (in order)

```bash
# 1. Move into the project folder
cd lld-practice-platform

# 2. Install dependencies
npm install

# 3. Create your .env file from the example, then fill in real values
cp .env.example .env
# edit .env: set MONGO_URI (MongoDB Atlas connection string) and ANTHROPIC_API_KEY

# 4. Seed the database with sample LLD problems
npm run seed

# 5. Start the server
npm start
# or, for auto-restart during development:
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Flow
1. `/problems` — see the list of LLD problems
2. Click a problem → `/problems/:id` — read requirements, paste your design
3. Submit → server saves it, calls Claude for feedback, redirects to `/submissions/:id`
4. `/submissions/:id` — see your submission and the AI feedback side by side

## Notes
- Kept intentionally as a monolith (single Express app), per assignment scope.
- MongoDB Atlas free tier works fine — no local Mongo install needed.
- If `ANTHROPIC_API_KEY` is missing/invalid, submissions still save; the feedback field will show a friendly failure message instead of crashing.
