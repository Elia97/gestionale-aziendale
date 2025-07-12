<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\Category;

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
        static $productNames;

        if (! $productNames) {
            $productNames = [
                'Laptop Dell Inspiron',
                'Laptop HP Pavilion',
                'Laptop Lenovo ThinkPad',
                'Laptop ASUS VivoBook',
                'Desktop HP Elite',
                'Desktop Dell OptiPlex',
                'Desktop Lenovo ThinkCentre',
                'Monitor Samsung 24"',
                'Monitor LG UltraWide',
                'Monitor Dell UltraSharp',
                'Monitor ASUS ProArt',
                'Tastiera Logitech MX Keys',
                'Tastiera Corsair K95',
                'Tastiera Razer BlackWidow',
                'Mouse Logitech MX Master',
                'Mouse Razer DeathAdder',
                'Mouse SteelSeries Rival',
                'SSD Samsung 970 EVO',
                'SSD Kingston NV2',
                'HDD Seagate Barracuda',
                'HDD WD Blue',
                'Router ASUS AX6000',
                'Switch Netgear GS108',
                'Access Point Ubiquiti',
                'Cuffie Sony WH-1000XM4',
                'Cuffie Bose QuietComfort',
                'Speaker JBL Charge',
                'Webcam Logitech C920',
                'Microfono Blue Yeti',
                'Stampante HP LaserJet',
                'Tablet iPad Air',
                'Smartphone Samsung Galaxy',
                'Caricabatterie Anker'
            ];
            shuffle($productNames);
        }

        $productName = array_pop($productNames);
        if (! $productName) {
            $productName = $this->faker->words(2, true);
        }

        return [
            'code' => $this->faker->unique()->ean8(),
            'name' => $productName,
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'category' => $this->faker->randomElement(Category::cases())->value,
        ];
    }
}
