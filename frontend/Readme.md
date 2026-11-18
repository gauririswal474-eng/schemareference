# Frontend: Users and Posts (React + Axios)

- Form to add a user (name, email)
- Form to add a post (choose a user, title, content)
- List of all posts showing the author's name and email from the referenced user

## Setup
```
cd frontend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
`VITE_API_URL` is the backend URL, e.g. `http://localhost:5000`. The backend must be running.
