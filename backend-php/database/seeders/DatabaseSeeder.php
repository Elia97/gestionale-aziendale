<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Impostiamo date realistiche per simulare un business reale

        // Fase 1: Setup iniziale (6-12 mesi fa)
        // Utenti, clienti, prodotti e magazzini esistono da tempo
        $this->command->info('Seeding users, customers, products, and warehouses (6-12 months ago)...');

        $this->call([
            UserSeeder::class,
            CustomerSeeder::class,
            ProductSeeder::class,
            WarehouseSeeder::class,
        ]);

        // Fase 2: Stock management (3-6 mesi fa)
        // Lo stock viene gestito dopo aver allestito la struttura
        $this->command->info('Seeding stock data (3-6 months ago)...');

        $this->call([
            StockSeeder::class,
        ]);

        // Fase 3: Attività recente (ultimi 3 mesi)
        // Gli ordini sono l'attività più recente
        $this->command->info('Seeding recent orders (last 3 months)...');

        $this->call([
            OrderSeeder::class,
        ]);

        $this->command->info('Database seeding completed with realistic timeline!');
    }
}
