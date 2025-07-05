<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserSetting>
 */
class UserSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Collegamento all'utente: deve essere specificato al momento della creazione
            'language' => $this->faker->randomElement(['it', 'en', 'de']),
            'timezone' => $this->faker->timezone(),

            // Notification settings
            'emailNotifications' => $this->faker->boolean(80),
            'pushNotifications' => $this->faker->boolean(70),
            'smsNotifications' => $this->faker->boolean(30),
            'orderUpdates' => $this->faker->boolean(90),
            'stockAlerts' => $this->faker->boolean(85),
            'systemMaintenance' => $this->faker->boolean(75),
            'marketingEmails' => $this->faker->boolean(40),

            // Security settings
            'twoFactorAuth' => $this->faker->boolean(20),
            'sessionTimeout' => $this->faker->numberBetween(15, 60),
            'passwordExpiry' => $this->faker->numberBetween(30, 180),
            'loginAttempts' => $this->faker->numberBetween(3, 10),
            'ipWhitelist' => $this->faker->ipv4() . ',' . $this->faker->ipv4(),

            // System settings
            'currency' => $this->faker->randomElement(['EUR', 'USD', 'GBP']),
            'dateFormat' => $this->faker->randomElement(['DD/MM/YYYY', 'MM/DD/YYYY']),
            'timeFormat' => $this->faker->randomElement(['24h', '12h']),
            'backupFrequency' => $this->faker->randomElement(['daily', 'weekly', 'monthly']),
            'maintenanceMode' => $this->faker->boolean(10),
        ];
    }
}
