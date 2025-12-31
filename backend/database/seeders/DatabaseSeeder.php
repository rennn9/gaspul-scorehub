<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create superadmin user
        User::create([
            'name' => 'Super Admin',
            'username' => 'admin@scorehub.com',
            'email' => null,
            'password' => Hash::make('123123'),
            'role' => 'admin',
        ]);

        // Create event
        Event::create([
            'name' => 'HAB Kemenag 2026',
            'description' => 'Peringatan Hari Amal Bhakti ke-80 Kementerian Agama',
            'start_date' => '2026-01-03',
            'end_date' => '2026-01-03',
            'is_active' => true,
        ]);
    }
}
