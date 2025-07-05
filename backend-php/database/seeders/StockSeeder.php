<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::pluck('id')->toArray();
        $warehouses = Warehouse::pluck('id')->toArray();

        $stocks = [];

        foreach ($warehouses as $warehouseId) {
            // Per ogni magazzino scegli 5–10 prodotti random
            $selectedProducts = collect($products)->shuffle()->take(rand(5, 10));

            foreach ($selectedProducts as $productId) {
                $stocks[] = [
                    'product_id' => $productId,
                    'warehouse_id' => $warehouseId,
                    'quantity' => rand(1, 100),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Inserisci tutti i record in una volta
        Stock::insert($stocks);
    }
}
