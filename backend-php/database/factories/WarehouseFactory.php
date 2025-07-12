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
        static $warehouseNames;

        if (! $warehouseNames) {
            $warehouseNames = [
                'Magazzino Centrale',
                'Deposito Nord',
                'Deposito Sud',
                'Magazzino Est',
                'Magazzino Ovest',
                'Centro Logistico Milano',
                'Deposito Roma',
                'Hub Distribuzione Torino',
                'Magazzino Napoli',
                'Centro Smistamento Bologna',
                'Deposito Firenze',
                'Magazzino Venezia',
                'Hub Logistico Genova',
                'Deposito Principale',
                'Magazzino Secondario',
                'Centro Distribuzione',
                'Punto Raccolta A',
                'Punto Raccolta B',
                'Deposito Express'
            ];
            shuffle($warehouseNames);
        }

        $warehouseName = array_pop($warehouseNames);
        if (! $warehouseName) {
            $warehouseName = 'Magazzino ' . $this->faker->company();
        }

        return [
            'name' => $warehouseName,
            'address' => $this->faker->address()
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
