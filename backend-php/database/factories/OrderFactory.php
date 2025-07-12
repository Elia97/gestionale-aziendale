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
        static $combinations;
        static $statusDistribution;

        if (! $combinations) {
            $customerIds = Customer::pluck('id')->toArray();
            $userIds = User::pluck('id')->toArray();

            $combinations = [];
            foreach ($customerIds as $customerId) {
                foreach ($userIds as $userId) {
                    $combinations[] = [$customerId, $userId];
                }
            }
            shuffle($combinations);
        }

        if (! $statusDistribution) {
            // Creiamo una distribuzione realistica degli stati
            $statusDistribution = array_merge(
                array_fill(0, 60, 'completed'),    // 60% completati
                array_fill(0, 25, 'pending'),      // 25% in attesa
                array_fill(0, 10, 'processing'),   // 10% in elaborazione
                array_fill(0, 5, 'cancelled')      // 5% cancellati
            );
            shuffle($statusDistribution);
        }

        $pair = array_pop($combinations);

        if (! $pair || count($pair) < 2) {
            // Se finiscono le combinazioni, prendi un customer_id e user_id casuali
            $pair = [
                Customer::inRandomOrder()->value('id'),
                User::inRandomOrder()->value('id'),
            ];
        }

        // Prendi uno stato dalla distribuzione
        $status = array_pop($statusDistribution);
        if (! $status) {
            $status = $this->faker->randomElement(['pending', 'completed', 'cancelled', 'processing']);
        }

        return [
            'customer_id' => $pair[0],
            'user_id' => $pair[1],
            'status' => $status,
            'total' => 0, // Il totale verrà calcolato dopo aver creato gli OrderItems
        ];
    }
}
