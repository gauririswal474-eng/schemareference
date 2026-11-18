# Backend: Schema Reference (Express + Mongoose)

Demonstrates referencing one Mongoose schema from another.

## Schemas
- **User:** `name`, `email` (unique, validated)
- **Post:** `title`, `content`, `user` (an `ObjectId` with `ref: 'User'`)

## Routes
| Method | Route | Description |
|---|---|---|
| POST | `/users` | Add a new user |
| POST | `/posts` | Add a new post linked to a user (`{ title, content, user: "<userId>" }`) |
| GET | `/posts` | All posts with user information (uses `.populate('user', 'name email')`) |
| GET | `/users` | List users (used by the frontend dropdown) |

## Setup
```
cd backend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev
```
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `CLIENT_URL` | Allowed frontend origin for CORS (empty = allow all) |

Import `postman_collection.json` into Postman to test: run **Create user** first (it saves the user id), then **Create post**, then **Get all posts**.

## Notes
- Errors return JSON `{ success: false, message }`: validation errors 400, duplicate email 409, unknown user 404.
- The user id is checked before a post is created, so a post cannot point to a user that does not exist.
