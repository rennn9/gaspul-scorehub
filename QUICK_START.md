# Quick Start Guide

Panduan cepat untuk menjalankan Gaspul ScoreHub.

## ✅ Setup Sudah Selesai!

Database dan semua konfigurasi sudah siap. Anda hanya perlu menjalankan server.

## 🚀 Cara Menjalankan

### 1. Start Backend (Laravel)

Terminal 1:
```bash
cd backend
php artisan serve
```

Backend akan berjalan di: **http://localhost:8000**

### 2. Start Frontend (React)

Terminal 2:
```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

### 3. Buka Aplikasi

Buka browser dan akses: **http://localhost:5173**

### 4. Login

Gunakan salah satu akun demo:

**Admin:**
- Email: `admin@scorehub.com`
- Password: `password123`

**User:**
- Email: `user@scorehub.com`
- Password: `password123`

## 📦 Data yang Sudah Tersedia

### Users
- **Admin**: admin@scorehub.com / password123
- **User**: user@scorehub.com / password123

### Event
- Porseni 2025 (15-20 Januari 2025)

### Sports Types
- Sepak Bola ⚽
- Basket 🏀
- Voli 🏐

### Teams
- Tim Merah (Fakultas Teknik)
- Tim Biru (Fakultas Ekonomi)
- Tim Hijau (Fakultas Hukum)
- Tim Kuning (Fakultas Kedokteran)

### Matches
- 5 pertandingan dengan status: finished, ongoing, scheduled

## 🔑 Akses Admin vs User

### Admin (admin@scorehub.com)
- ✅ Lihat semua data (events, teams, matches)
- ✅ Buat, edit, hapus events
- ✅ Buat, edit, hapus teams
- ✅ Buat, edit, hapus matches
- ✅ Update skor pertandingan
- ✅ Manage sports types

### User (user@scorehub.com)
- ✅ Lihat semua data (read-only)
- ❌ Tidak bisa create/update/delete

## 📖 Dokumentasi Lengkap

- [README.md](README.md) - Setup & dokumentasi lengkap
- [API_TESTING.md](API_TESTING.md) - Contoh request API
- [rancangan-awal.md](rancangan-awal.md) - Rancangan awal sistem

## 🎯 Next Steps

### Testing API
Lihat [API_TESTING.md](API_TESTING.md) untuk contoh lengkap semua endpoint.

### Frontend Development
Backend API sudah siap. Anda bisa mulai develop frontend dengan:
- React + Vite
- Vue.js
- Next.js
- Atau framework frontend pilihan lainnya

### Database Management

**Lihat data:**
```bash
cd backend
php artisan tinker
```

Kemudian di tinker:
```php
// Lihat semua events
App\Models\Event::all();

// Lihat matches dengan relasi
App\Models\MatchGame::with(['teamA', 'teamB', 'event'])->get();

// Lihat users
App\Models\User::all();
```

**Reset database:**
```bash
php artisan migrate:fresh --seed
```

## ⚠️ Troubleshooting

### Port 8000 sudah digunakan
```bash
php artisan serve --port=8001
```

### Database connection error
Pastikan MySQL sudah running dan kredensial di `backend/.env` benar.

### Lupa password admin
Reset database:
```bash
cd backend
php artisan migrate:fresh --seed
```

## 📚 Struktur Project

```
gaspul-scorehub/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/  # API Controllers
│   │   └── Models/               # Eloquent Models
│   ├── database/
│   │   ├── migrations/           # Database schema
│   │   └── seeders/              # Sample data
│   └── routes/
│       └── api.php               # API routes
├── API_TESTING.md          # Panduan testing API
├── README.md               # Dokumentasi lengkap
└── QUICK_START.md         # File ini
```

## 🎉 Selamat!

Backend API Gaspul ScoreHub sudah siap digunakan!

Silakan explore API atau mulai develop frontend. Happy coding! 🚀
