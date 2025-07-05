<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Warehouse;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
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
            $productIds = Product::pluck(column: 'id')->toArray();
            $warehouseIds = Warehouse::pluck(column: 'id')->toArray();

            $combinations = [];
            foreach ($productIds as $productId) {
                foreach ($warehouseIds as $warehouseId) {
                    $combinations[] = [$productId, $warehouseId];
                }
            }
            shuffle(array: $combinations);
        }

        $pair = array_pop(array: $combinations);

        if (! $pair || count(value: $pair) < 2) {
            // Se finiscono le combinazioni, prendi un product_id e warehouse_id casuali
            $pair = [
                Product::inRandomOrder()->value(column: 'id'),
                Warehouse::inRandomOrder()->value(column: 'id'),
            ];
        }

        return [
            'product_id' => $pair[0],
            'warehouse_id' => $pair[1],
            'quantity' => $this->faker->numberBetween(int1: 0, int2: 100),
        ];
    }
}
