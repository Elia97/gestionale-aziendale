<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 100 random order items
        OrderItem::factory()
            ->count(count: 100)
            ->create(attributes: fn(): array => [
                'order_id' => Order::inRandomOrder()->value(column: 'id'),
                'product_id' => Product::inRandomOrder()->value(column: 'id'),
                'quantity' => fake()->numberBetween(int1: 1, int2: 10),
                'price' => fake()->randomFloat(nbMaxDecimals: 2, min: 1, max: 100),
            ]);
    }
}
