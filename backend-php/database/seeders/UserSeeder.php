<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin con credenziali note
        $admin = User::create([
            'firstName' => 'Admin',
            'lastName' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'IT',
        ]);

        // Crea impostazioni per l'admin
        UserSetting::factory()->create([
            'user_id' => $admin->id,
        ]);

        // Utenti operatori di prova
        User::factory(9)->create([
            'role' => 'operator',
        ])->each(function (User $user) {
            // Per ogni utente crea anche le impostazioni collegate
            UserSetting::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
