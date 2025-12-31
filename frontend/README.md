# Gaspul ScoreHub - Frontend

Frontend React application untuk sistem pencatatan skor pertandingan.

## Tech Stack

- React 18 + Vite
- React Router DOM
- Axios
- Zustand (State Management)
- Tailwind CSS

## Running the Application

```bash
npm install
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

**PENTING:** Pastikan backend API sudah running di `http://localhost:8000`

## Demo Account

**Admin:**
- Username: `admin@scorehub.com`
- Password: `123123`

## Features

### Public Pages
- Home - List semua events
- Matches - List pertandingan dengan filter

### Admin Pages (Require Login)
- Admin Dashboard
- Manage Match Scores

## Build for Production

```bash
npm run build
```
