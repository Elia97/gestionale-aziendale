<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // I prodotti sono stati aggiunti al catalogo negli ultimi 8-12 mesi
        $startDate = Carbon::now()->subMonths(12);
        $endDate = Carbon::now()->subMonths(8);

        // Creiamo 25 prodotti con date realistiche
        for ($i = 0; $i < 25; $i++) {
            $createdAt = fake()->dateTimeBetween($startDate, $endDate);

            Product::factory()->create([
                'created_at' => $createdAt,
                'updated_at' => fake()->dateTimeBetween($createdAt, 'now'),
            ]);
        }
    }
}
