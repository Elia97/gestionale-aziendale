<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // I magazzini sono stati aperti negli ultimi 10-12 mesi
        $startDate = Carbon::now()->subMonths(12);
        $endDate = Carbon::now()->subMonths(10);

        // Creiamo 5 magazzini con date realistiche
        for ($i = 0; $i < 5; $i++) {
            $createdAt = fake()->dateTimeBetween($startDate, $endDate);

            Warehouse::factory()->create([
                'created_at' => $createdAt,
                'updated_at' => fake()->dateTimeBetween($createdAt, 'now'),
            ]);
        }
    }
}
