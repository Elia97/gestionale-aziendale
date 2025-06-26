<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->ean8(),
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(nbMaxDecimals: 2, min: 1, max: 1000)
        ];
    }
}
