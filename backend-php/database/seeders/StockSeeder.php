<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lo stock è stato gestito negli ultimi 3-6 mesi
        $startDate = Carbon::now()->subMonths(6);
        $endDate = Carbon::now()->subMonths(3);

        $products = Product::pluck('id')->toArray();
        $warehouses = Warehouse::pluck('id')->toArray();

        $stocks = [];

        foreach ($warehouses as $warehouseId) {
            // Per ogni magazzino scegli 5–10 prodotti random
            $selectedProducts = collect($products)->shuffle()->take(rand(5, 10));

            foreach ($selectedProducts as $productId) {
                // Ogni stock ha una data di creazione diversa
                $createdAt = fake()->dateTimeBetween($startDate, $endDate);
                $updatedAt = fake()->dateTimeBetween($createdAt, 'now');

                $stocks[] = [
                    'product_id' => $productId,
                    'warehouse_id' => $warehouseId,
                    'quantity' => rand(1, 100),
                    'created_at' => $createdAt,
                    'updated_at' => $updatedAt,
                ];
            }
        }

        // Inserisci tutti i record in una volta
        Stock::insert($stocks);
    }
}
