# Gaspul ScoreHub

Sistem Manajemen Skor Pertandingan untuk HAB Kemenag 2026 - Peringatan Hari Amal Bhakti ke-80 Kementerian Agama.

## Tech Stack

### Backend
- Laravel 11
- MySQL
- Laravel Sanctum (API Authentication)

### Frontend
- React 19
- Vite
- React Router DOM
- Zustand (State Management)
- Tailwind CSS v4
- Axios

## Fitur Utama

- **Event Management**: Kelola event dan turnamen olahraga
- **Team Management**: Manajemen tim peserta
- **Match Scoring**: Pencatatan skor pertandingan secara real-time
- **Sports Types**: Kelola berbagai jenis cabang olahraga
- **Leaderboard**: Sistem peringkat berdasarkan hasil pertandingan
- **User Management**: Kelola akun admin
- **Authentication**: Sistem login berbasis username

## Struktur Project

```
gaspul-scorehub/
├── backend/          # Laravel 11 API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
└── frontend/         # React 19 Application
    ├── src/
    ├── public/
    └── ...
```

## Instalasi

### Prerequisites

- PHP 8.2 atau lebih tinggi
- Composer
- Node.js 18 atau lebih tinggi
- MySQL 8.0 atau lebih tinggi

### Setup Backend

1. Masuk ke direktori backend:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy file environment:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Konfigurasi database di file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gaspul_scorehub
DB_USERNAME=root
DB_PASSWORD=your_database_password
```

6. Jalankan migration dan seeder:
```bash
php artisan migrate --seed
```

7. Jalankan development server:
```bash
php artisan serve
```

Backend akan berjalan di `http://localhost:8000`

### Setup Frontend

1. Masuk ke direktori frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Konfigurasi API URL di `src/api/axios.js`:
```javascript
baseURL: 'http://localhost:8000/api'
```

4. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## Demo Account

Setelah menjalankan seeder (`php artisan migrate --seed`), akun admin berikut akan tersedia:

**Admin:**
- Username: `admin@scorehub.com`
- Password: `123123`

**Event Default:**
- Event: HAB Kemenag 2026
- Deskripsi: Peringatan Hari Amal Bhakti ke-80 Kementerian Agama
- Tanggal: 3 Januari 2026

## Development

### Backend API Endpoints

API menggunakan authentication berbasis token (Laravel Sanctum).

- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/events` - List events
- `GET /api/teams` - List teams
- `GET /api/matches` - List matches
- Dan endpoint CRUD lainnya untuk management

### Frontend Routes

- `/` - Beranda (list events)
- `/matches` - List pertandingan
- `/login` - Halaman login
- `/admin` - Dashboard admin
- `/admin/events` - Kelola events
- `/admin/teams` - Kelola teams
- `/admin/matches` - Kelola pertandingan
- `/admin/sports-types` - Kelola jenis olahraga
- `/admin/users` - Kelola akun admin

## Build Production

### Backend
```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend
```bash
cd frontend
npm run build
```

File hasil build akan tersimpan di `frontend/dist/`

## License

MIT License

Copyright (c) 2025 Gaspul ScoreHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
