<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Utenti admin di prova
        User::factory(count: 2)->create(attributes: [
            'role' => 'admin',
        ]);

        // Utenti operatori di prova
        User::factory(count: 5)->create(attributes: [
            'role' => 'operator',
        ]);
    }
}
