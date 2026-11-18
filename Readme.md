# Schema Reference Task (Express + Mongoose + React)

- `backend/`: Express API with User and Post schemas, where Post references User. See `backend/Readme.md`.
- `frontend/`: React app with forms to add users and posts and a list of posts with user info. See `frontend/Readme.md`.

## Run locally
```
# terminal 1
cd backend && npm install && cp .env.example .env && npm run dev
# terminal 2
cd frontend && npm install && cp .env.example .env && npm run dev
```

## Deployed links
- Backend (Render): https://YOUR-BACKEND.onrender.com
- Frontend (Netlify): https://YOUR-FRONTEND.netlify.app
