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
        // Stocks for testing
        Stock::factory()
            ->count(count: 50)
            ->create(attributes: fn(): array => [
                'product_id' => Product::inRandomOrder()->value(column: 'id'),
                'warehouse_id' => Warehouse::inRandomOrder()->value(column: 'id'),
                'quantity' => rand(min: 1, max: 100),
            ]);
    }
}
