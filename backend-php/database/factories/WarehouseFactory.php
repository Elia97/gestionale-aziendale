<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Warehouse>
 */
class WarehouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'address' => fake()->address()
        ];
    }

    /**
     * Indicate that the warehouse has no address.
     */
    public function withoutAddress(): static
    {
        return $this->state(state: fn(): array => [
            'address' => null,
        ]);
    }
}
