# AI Usage

This document describes where and how AI tools were used while building this project.

## Where AI was used
- Scaffolding the initial folder structure and boilerplate (Express routes, Mongoose models, EJS views).
- Drafting the feedback-generation prompt sent to the Claude API in `utils/generateFeedback.js`.
- Generating starter CSS for basic styling.

## Where AI was NOT used / manual work
- [Fill in: e.g. "Reviewed and adjusted all route logic to fix a path-mounting bug"]
- [Fill in: e.g. "Manually tested submission flow end-to-end and fixed edge cases"]
- [Fill in: any design decisions you made yourself]

## Key AI-assisted decisions
- Chose to keep the architecture a single monolithic Express app (no microservices), per assignment guidance.
- Chose an LLM-based feedback engine (via Claude API) instead of a rule-based checklist, since it gives richer, more explainable feedback with less code to maintain.
- Kept the data model minimal: two collections (`problems`, `submissions`) to fit a 2-day timeline.
