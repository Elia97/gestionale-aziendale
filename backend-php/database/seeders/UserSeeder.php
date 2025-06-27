<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin con credenziali note
        User::create(attributes: [
            'name' => 'Admin Test',
            'email' => 'admin@example.com',
            'password' => Hash::make(value: 'password'), // password conosciuta
            'role' => 'admin',
        ]);

        // Utenti operatori di prova
        User::factory(count: 9)->create(attributes: [
            'role' => 'operator',
        ]);
    }
}
