<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => Customer::inRandomOrder()->value(column: 'id'),
            'user_id' => User::inRandomOrder()->value(column: 'id'),
            'status' => $this->faker->randomElement(array: ['pending', 'completed', 'cancelled']),
            'total' => $this->faker->numberBetween(int1: 1000, int2: 100000) / 100,
        ];
    }
}
