# Rancangan Sistem Web Pencatatan Skor Pertandingan

## 1. Gambaran Umum

Sistem ini adalah aplikasi web untuk mengelola pencatatan skor pertandingan sebuah event. Aplikasi dibangun menggunakan teknologi berikut:

* **Backend**: Laravel
* **Database**: MySQL
* **Frontend**: React

Tujuan utama sistem adalah menyediakan platform bagi Admin untuk mengelola pertandingan dan skor, serta memberikan akses bagi user biasa untuk melihat jadwal serta hasil pertandingan.

---

## 2. Peran & Fitur Sistem

### 🔐 Admin

Admin memiliki hak akses penuh untuk melakukan pengelolaan data pertandingan dengan fitur:

1. **Manajemen Event / Pertandingan**

   * Input nama event atau kejuaraan.
   * Contoh: Porseni 2025, Turnamen E-Sport, Event 17 Agustus, dll.

2. **Manajemen Tim / Peserta**

   * Input nama tim.
   * Mendukung format pertandingan tim vs tim.

3. **Penjadwalan Pertandingan**

   * Menentukan tim A vs tim B.
   * Menentukan tanggal pelaksanaan.
   * Menentukan jam pertandingan.
   * (Opsional) Menentukan lokasi pertandingan.

4. **Input & Update Skor Pertandingan**

   * Input skor setelah pertandingan selesai.
   * Dapat dilakukan update apabila ada koreksi resmi.

5. **Pengaturan Status Pertandingan (Sangat Direkomendasikan)**

   * Scheduled
   * Ongoing
   * Finished

---

### 👤 User Biasa

User biasa hanya memiliki akses read-only dengan fitur:

1. Melihat daftar jadwal pertandingan.
2. Melihat hasil pertandingan.
3. (Opsional) Filter berdasarkan event, tanggal, atau tim.

---

## 3. Struktur Data yang Direkomendasikan

### Tabel Utama

* **events**: menyimpan daftar event
* **teams**: menyimpan daftar tim
* **matches**: menyimpan pasangan pertandingan + jadwal + status
* **match_scores** (opsional jika tidak disatukan dengan matches): menyimpan skor
* **users**: untuk autentikasi dan role (admin atau user)
* **sports_types** (opsional): untuk jenis lomba/cabang jika multi event

---

## 4. Fitur Tambahan yang Disarankan

### 1️⃣ Status Pertandingan

Menambahkan status pertandingan untuk memperjelas informasi kepada user:

* Coming Soon (Scheduled)
* Ongoing
* Finished

---

### 2️⃣ Filtering dan Sorting

Agar lebih mudah digunakan saat event besar:

* Filter berdasarkan tanggal
* Filter berdasarkan tim
* Filter berdasarkan event
* Sorting berdasarkan waktu terdekat

---

### 3️⃣ Realtime Update (Opsional)

Jika sistem ingin lebih interaktif:

* Menggunakan Laravel Echo / WebSocket
* Atau mekanisme polling berkala

---

### 4️⃣ Keamanan & Role Management

* Admin wajib login
* User umum dapat melihat data tanpa login (atau opsional login)
* Validasi input wajib diterapkan

---

### 5️⃣ UX / UI Direkomendasikan

#### Untuk Admin

* Dashboard ringkas
* CRUD data mudah digunakan
* Riwayat perubahan skor (opsional)

#### Untuk User

* Halaman jadwal pertandingan
* Halaman hasil pertandingan
* Detail pertandingan

---

### 6️⃣ Logging / Audit Trail (Opsional)

Berguna jika ada komplain atau revisi:

* Menyimpan jejak siapa yang mengubah skor
* Menyimpan waktu perubahan

---

## 5. Potensi Pengembangan ke Depan

* Leaderboard otomatis
* Perhitungan poin otomatis
* Ranking tim
* Statistik performa tim
* Export hasil ke PDF / Excel

---

## 6. Kesimpulan

Rancangan sistem ini sudah solid untuk kebutuhan event pencatatan skor. Dengan Laravel + MySQL + React, sistem siap dikembangkan secara scalable. Penambahan fitur seperti status pertandingan, filtering, keamanan, dan kemungkinan realtime akan meningkatkan profesionalitas dan pengalaman pengguna.

Jika diperlukan, dokumen ini dapat dikembangkan lebih lanjut menuju ERD, API Specification, dan desain UI/UX.
