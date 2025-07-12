<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Gli utenti sono stati creati 6-12 mesi fa
        $userCreationPeriod = [
            Carbon::now()->subMonths(12),
            Carbon::now()->subMonths(6)
        ];

        // Admin creato per primo (12 mesi fa)
        $adminCreatedAt = Carbon::now()->subMonths(12)->addDays(fake()->numberBetween(1, 30));

        $admin = User::create([
            'firstName' => 'Admin',
            'lastName' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'department' => 'IT',
            'created_at' => $adminCreatedAt,
            'updated_at' => $adminCreatedAt,
        ]);

        // Crea impostazioni per l'admin (create poco dopo l'utente)
        $adminSettingsCreatedAt = Carbon::parse($adminCreatedAt)->addDays(fake()->numberBetween(1, 7));

        UserSetting::factory()->create([
            'user_id' => $admin->id,
            'created_at' => $adminSettingsCreatedAt,
            'updated_at' => fake()->dateTimeBetween($adminSettingsCreatedAt, 'now'),
        ]);

        // Utenti operatori creati gradualmente nel tempo
        for ($i = 0; $i < 9; $i++) {
            $userCreatedAt = fake()->dateTimeBetween($userCreationPeriod[0], $userCreationPeriod[1]);

            $user = User::factory()->create([
                'role' => 'operator',
                'created_at' => $userCreatedAt,
                'updated_at' => fake()->dateTimeBetween($userCreatedAt, 'now'),
            ]);

            // Impostazioni create dopo l'utente
            $settingsCreatedAt = Carbon::parse($userCreatedAt)->addDays(fake()->numberBetween(1, 30));

            UserSetting::factory()->create([
                'user_id' => $user->id,
                'created_at' => $settingsCreatedAt,
                'updated_at' => fake()->dateTimeBetween($settingsCreatedAt, 'now'),
            ]);
        }
    }
}
