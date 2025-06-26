<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 random orders
        Order::factory()
            ->count(count: 50)
            ->create(attributes: fn(): array => [
                'customer_id' => Customer::inRandomOrder()->value(column: 'id'),
                'user_id' => User::where(column: 'role', operator: 'operator')->inRandomOrder()->value(column: 'id'),
                'status' => 'pending',
                'total' => fake()->randomFloat(nbMaxDecimals: 2, min: 20, max: 500),
            ]);
    }
}
