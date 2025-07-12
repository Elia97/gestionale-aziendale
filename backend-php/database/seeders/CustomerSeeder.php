<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // I clienti si sono registrati gradualmente negli ultimi 6-12 mesi
        $customerRegistrationPeriod = [
            Carbon::now()->subMonths(12),
            Carbon::now()->subMonths(6)
        ];

        // Creiamo 15 clienti con date realistiche
        for ($i = 0; $i < 15; $i++) {
            $createdAt = fake()->dateTimeBetween($customerRegistrationPeriod[0], $customerRegistrationPeriod[1]);

            Customer::factory()->create([
                'created_at' => $createdAt,
                'updated_at' => fake()->dateTimeBetween($createdAt, 'now'),
            ]);
        }
    }
}
