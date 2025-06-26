<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::inRandomOrder()->value(column: 'id'),
            'product_id' => Product::inRandomOrder()->value(column: 'id'),
            'quantity' => fake()->numberBetween(int1: 1, int2: 10),
            'price' => fake()->randomFloat(nbMaxDecimals: 2, min: 1, max: 100),
        ];
    }
}
