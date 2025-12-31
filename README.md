# Gaspul ScoreHub

Sistem web untuk mengelola pencatatan skor pertandingan event.

## Tech Stack

- **Backend**: Laravel 12 + MySQL
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Authentication**: Laravel Sanctum
- **State Management**: Zustand

## Struktur Database

### Tabel Utama
- `events` - Daftar event/kejuaraan
- `teams` - Daftar tim peserta
- `matches` - Pertandingan + jadwal + skor
- `sports_types` - Jenis cabang lomba
- `users` - User dan role management

## Setup Backend

### Prerequisites
- PHP >= 8.2
- Composer
- MySQL >= 8.0
- Node.js >= 18 (untuk frontend)

### Langkah Instalasi

1. **Clone atau masuk ke direktori project**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Copy file environment**
   ```bash
   cp .env.example .env
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Konfigurasi database**

   Buat database MySQL dengan nama `gaspul_scorehub`, kemudian update file `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=gaspul_scorehub
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

6. **Jalankan migration**
   ```bash
   php artisan migrate
   ```

7. **Jalankan seeder untuk data contoh** (opsional)
   ```bash
   php artisan db:seed
   ```

8. **Jalankan server development**
   ```bash
   php artisan serve
   ```

   Backend API akan berjalan di `http://localhost:8000`

## Setup Frontend

### Langkah Instalasi

1. **Masuk ke folder frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Frontend akan berjalan di `http://localhost:5173`

**PENTING:** Pastikan backend API sudah running sebelum menjalankan frontend!

## Data Demo

Setelah menjalankan seeder, Anda dapat login dengan kredensial berikut:

**Admin Account:**
- Email: `admin@scorehub.com`
- Password: `password123`
- Role: `admin` (Full access ke semua fitur)

**User Account:**
- Email: `user@scorehub.com`
- Password: `password123`
- Role: `user` (Read-only access)

Data demo yang sudah dibuat:
- 1 Event (Porseni 2025)
- 3 Sports Types (Sepak Bola, Basket, Voli)
- 4 Teams (Tim Merah, Biru, Hijau, Kuning)
- 5 Matches dengan berbagai status (finished, ongoing, scheduled)

## API Endpoints

### Public Endpoints (Tanpa Authentication)

#### Authentication
- `POST /api/register` - Registrasi user baru
- `POST /api/login` - Login user

#### Events
- `GET /api/events` - List semua events
- `GET /api/events/{id}` - Detail event

#### Teams
- `GET /api/teams` - List semua teams
- `GET /api/teams/{id}` - Detail team
- `GET /api/teams?event_id={id}` - Filter teams by event

#### Matches
- `GET /api/matches` - List semua matches
- `GET /api/matches/{id}` - Detail match
- `GET /api/matches?event_id={id}` - Filter by event
- `GET /api/matches?status={status}` - Filter by status (scheduled/ongoing/finished)
- `GET /api/matches?date={date}` - Filter by date

#### Sports Types
- `GET /api/sports-types` - List semua jenis olahraga
- `GET /api/sports-types/{id}` - Detail sports type

### Protected Endpoints (Require Authentication)

Header yang diperlukan:
```
Authorization: Bearer {access_token}
```

#### User
- `POST /api/logout` - Logout user
- `GET /api/me` - Get current user info

#### Events (Admin only)
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

#### Teams (Admin only)
- `POST /api/teams` - Create team
- `PUT /api/teams/{id}` - Update team
- `DELETE /api/teams/{id}` - Delete team

#### Matches (Admin only)
- `POST /api/matches` - Create match
- `PUT /api/matches/{id}` - Update match
- `PATCH /api/matches/{id}/score` - Update match score
- `DELETE /api/matches/{id}` - Delete match

#### Sports Types (Admin only)
- `POST /api/sports-types` - Create sports type
- `PUT /api/sports-types/{id}` - Update sports type
- `DELETE /api/sports-types/{id}` - Delete sports type

## Contoh Request

### Register
```bash
POST /api/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Login
```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Create Event
```bash
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Porseni 2025",
  "description": "Event olahraga tahunan",
  "start_date": "2025-01-15",
  "end_date": "2025-01-20",
  "is_active": true
}
```

### Create Match
```bash
POST /api/matches
Authorization: Bearer {token}
Content-Type: application/json

{
  "event_id": 1,
  "sports_type_id": 1,
  "team_a_id": 1,
  "team_b_id": 2,
  "match_date": "2025-01-16 14:00:00",
  "location": "Lapangan Utama",
  "status": "scheduled"
}
```

### Update Match Score
```bash
PATCH /api/matches/1/score
Authorization: Bearer {token}
Content-Type: application/json

{
  "team_a_score": 3,
  "team_b_score": 2,
  "status": "finished"
}
```

## Fitur Utama

### Admin
- Manage events/kejuaraan
- Manage teams
- Penjadwalan pertandingan
- Input dan update skor
- Manage status pertandingan (scheduled → ongoing → finished)
- Manage sports types

### User Publik
- Lihat jadwal pertandingan
- Lihat hasil pertandingan
- Filter berdasarkan event, tanggal, status

## Development

### Testing
```bash
php artisan test
```

### Code Formatting
```bash
./vendor/bin/pint
```

### Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## License

This project is open-sourced software.
