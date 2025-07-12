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
        static $combinations;

        if (! $combinations) {
            $orderIds = Order::pluck('id')->toArray();
            $productIds = Product::pluck('id')->toArray();

            $combinations = [];
            foreach ($orderIds as $orderId) {
                foreach ($productIds as $productId) {
                    $combinations[] = [$orderId, $productId];
                }
            }
            shuffle($combinations);
        }

        $pair = array_pop($combinations);

        if (! $pair || count($pair) < 2) {
            // Se finiscono le combinazioni, prendi un order_id e product_id casuali
            $pair = [
                Order::inRandomOrder()->value('id'),
                Product::inRandomOrder()->value('id'),
            ];
        }

        return [
            'order_id' => $pair[0],
            'product_id' => $pair[1],
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->randomFloat(2, 1, 100),
        ];
    }
}
