<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'phone' => $this->faker->phoneNumber(),
            'password' => static::$password ??= Hash::make(value: 'password'),
            'remember_token' => Str::random(length: 10),
            'role' => $this->faker->randomElement(array: ['admin', 'operatore']),
            'department' => $this->faker->randomElement(array: ['produzione', 'IT', 'logistica']),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(state: fn(): array => [
            'email_verified_at' => null,
        ]);
    }
}
