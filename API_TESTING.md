# API Testing Guide

Panduan untuk testing API Gaspul ScoreHub menggunakan curl atau Postman.

## Base URL
```
http://localhost:8000/api
```

## 1. Authentication

### Register
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Login (Admin)
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@scorehub.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@scorehub.com",
    "role": "admin"
  },
  "access_token": "1|xxxxxxxxxxxxxxxxxxxxx",
  "token_type": "Bearer"
}
```

**Simpan `access_token` untuk request selanjutnya!**

### Get Current User
```bash
curl http://localhost:8000/api/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Logout
```bash
curl -X POST http://localhost:8000/api/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 2. Events (Public - Read, Protected - Write)

### Get All Events
```bash
curl http://localhost:8000/api/events
```

### Get Event Detail
```bash
curl http://localhost:8000/api/events/1
```

### Create Event (Admin Only)
```bash
curl -X POST http://localhost:8000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Turnamen Futsal 2025",
    "description": "Turnamen futsal antar kampus",
    "start_date": "2025-02-01",
    "end_date": "2025-02-10",
    "is_active": true
  }'
```

### Update Event (Admin Only)
```bash
curl -X PUT http://localhost:8000/api/events/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Porseni 2025 (Updated)",
    "is_active": false
  }'
```

### Delete Event (Admin Only)
```bash
curl -X DELETE http://localhost:8000/api/events/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 3. Sports Types

### Get All Sports Types
```bash
curl http://localhost:8000/api/sports-types
```

### Create Sports Type (Admin Only)
```bash
curl -X POST http://localhost:8000/api/sports-types \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Badminton",
    "icon": "🏸",
    "description": "Olahraga bulu tangkis"
  }'
```

## 4. Teams

### Get All Teams
```bash
curl http://localhost:8000/api/teams
```

### Get Teams by Event
```bash
curl http://localhost:8000/api/teams?event_id=1
```

### Get Team Detail
```bash
curl http://localhost:8000/api/teams/1
```

### Create Team (Admin Only)
```bash
curl -X POST http://localhost:8000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "name": "Tim Ungu",
    "description": "Tim dari fakultas pertanian"
  }'
```

### Update Team (Admin Only)
```bash
curl -X PUT http://localhost:8000/api/teams/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tim Merah Juara"
  }'
```

## 5. Matches

### Get All Matches
```bash
curl http://localhost:8000/api/matches
```

### Get Matches with Filters
```bash
# Filter by event
curl http://localhost:8000/api/matches?event_id=1

# Filter by status
curl http://localhost:8000/api/matches?status=finished

# Filter by date
curl http://localhost:8000/api/matches?date=2025-01-16

# Multiple filters
curl "http://localhost:8000/api/matches?event_id=1&status=scheduled"
```

### Get Match Detail
```bash
curl http://localhost:8000/api/matches/1
```

### Create Match (Admin Only)
```bash
curl -X POST http://localhost:8000/api/matches \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "sports_type_id": 1,
    "team_a_id": 1,
    "team_b_id": 2,
    "match_date": "2025-01-19 15:00:00",
    "location": "Lapangan Selatan",
    "status": "scheduled"
  }'
```

### Update Match Score (Admin Only)
```bash
curl -X PATCH http://localhost:8000/api/matches/4/score \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "team_a_score": 4,
    "team_b_score": 1,
    "status": "finished"
  }'
```

### Update Match (Admin Only)
```bash
curl -X PUT http://localhost:8000/api/matches/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Lapangan Barat",
    "notes": "Pertandingan ditunda 30 menit"
  }'
```

### Delete Match (Admin Only)
```bash
curl -X DELETE http://localhost:8000/api/matches/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing Workflow

### Scenario 1: View Public Data (No Auth Required)
1. Get all events
2. Get event detail (id=1)
3. Get all teams for event
4. Get all matches
5. Filter matches by status

### Scenario 2: Admin Creates New Match
1. Login as admin
2. Create new match
3. Update match score during game
4. Mark match as finished
5. View match results

### Scenario 3: Complete Event Management
1. Login as admin
2. Create new event
3. Create sports type
4. Create teams for the event
5. Schedule matches
6. Update scores
7. View event summary

## Using Postman

1. Import collection or create new requests
2. Set environment variable `BASE_URL` = `http://localhost:8000/api`
3. After login, save token to environment variable `TOKEN`
4. Use `{{TOKEN}}` in Authorization header

## Response Status Codes

- `200` - Success
- `201` - Created successfully
- `400` - Bad request / Validation error
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `422` - Validation error
- `500` - Server error
