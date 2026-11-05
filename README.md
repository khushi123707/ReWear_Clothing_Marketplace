# ReWear — Sustainable Clothing Exchange (MERN)

A beginner-friendly MERN stack clothing exchange platform inspired by the supplied ReWear homepage reference.

## Features
- Separate React pages: Home, Shop, Swap Requests, About, Login, Sign Up, Profile, Add Clothes
- Responsive green/cream visual theme
- Clothing catalogue with category filters and search
- Register/login using bcrypt + JWT
- Add clothing listings (image URL based)
- Create and view swap requests
- MongoDB persistence
- Newsletter subscription endpoint
- Demo clothing data automatically seeded when the server starts and the database is empty

## Requirements
- Node.js 18+
- MongoDB Community Server running locally OR a MongoDB Atlas connection string
- VS Code (recommended)

## 1. Start MongoDB
For local MongoDB, make sure the MongoDB Server service is running.

## 2. Configure backend
Open a terminal in `server`:
```bash
cd server
npm install
```
Copy `.env.example` to `.env`, then edit it:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rewear
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```
For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string. Replace `<password>` with your database user's password and URL-encode special characters in the password.

Start the backend:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`.

## 3. Start frontend
Open a SECOND terminal in the project root:
```bash
cd client
npm install
npm run dev
```
Open the URL shown by Vite, normally `http://localhost:5173`.

## Demo flow
1. Open Sign Up and create an account.
2. Login.
3. Open Add Clothes and add a clothing item using an image URL.
4. Open Shop to see listings.
5. Open a product and send a swap request.
6. Open Swap Requests to review requests.

## Image note
The demo catalogue uses image URLs from Unsplash so the clothing photos look close to the supplied reference. An internet connection is required for those photos. You can replace any URL with your own image URL.

## API routes
- `GET /api/health`
- `GET /api/clothes`
- `GET /api/clothes/:id`
- `POST /api/clothes` (login required)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (login required)
- `POST /api/swaps` (login required)
- `GET /api/swaps/my` (login required)
- `PATCH /api/swaps/:id` (owner of listing can accept/reject)
- `POST /api/newsletter`

This is a learning project, not a production-ready marketplace. Before public launch, add image uploads, email verification, rate limiting, stronger validation, moderation and deployment secrets.
