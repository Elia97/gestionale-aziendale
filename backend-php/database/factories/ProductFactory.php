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
            'code' => $this->faker->unique()->ean8(),
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(nbMaxDecimals: 2, min: 1, max: 1000),
            'category' => $this->faker->randomElement([
                'informatica',
                'accessori',
                'monitor',
                'storage',
                'networking',
                'audio'
            ]),
        ];
    }
}
