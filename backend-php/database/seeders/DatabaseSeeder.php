<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(class: [
            UserSeeder::class,
            // CustomerSeeder::class,
            // ProductSeeder::class,
            // WarehouseSeeder::class,
            // StockSeeder::class,
            // OrderSeeder::class,
        ]);
    }
}
