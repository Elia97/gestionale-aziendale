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
        $isSecurityConscious = $this->faker->boolean(30); // 30% degli utenti sono più attenti alla sicurezza
        $isActiveUser = $this->faker->boolean(70); // 70% degli utenti sono attivi

        return [
            // Collegamento all'utente: deve essere specificato al momento della creazione
            'language' => $this->faker->randomElement(['it', 'en', 'de']),
            'timezone' => $this->faker->randomElement([
                'Europe/Rome',
                'Europe/London',
                'Europe/Berlin',
                'Europe/Paris',
                'Europe/Madrid',
                'America/New_York',
                'America/Los_Angeles'
            ]),

            // Notification settings - correlate all'attività dell'utente
            'emailNotifications' => $isActiveUser ? $this->faker->boolean(85) : $this->faker->boolean(50),
            'pushNotifications' => $isActiveUser ? $this->faker->boolean(75) : $this->faker->boolean(40),
            'smsNotifications' => $this->faker->boolean(25),
            'orderUpdates' => $isActiveUser ? $this->faker->boolean(95) : $this->faker->boolean(70),
            'stockAlerts' => $isActiveUser ? $this->faker->boolean(90) : $this->faker->boolean(60),
            'systemMaintenance' => $this->faker->boolean(80),
            'marketingEmails' => $this->faker->boolean(35),

            // Security settings - correlate alla consapevolezza della sicurezza
            'twoFactorAuth' => $isSecurityConscious ? $this->faker->boolean(60) : $this->faker->boolean(10),
            'sessionTimeout' => $isSecurityConscious ? $this->faker->numberBetween(15, 30) : $this->faker->numberBetween(30, 60),
            'passwordExpiry' => $isSecurityConscious ? $this->faker->numberBetween(30, 90) : $this->faker->numberBetween(90, 180),
            'loginAttempts' => $isSecurityConscious ? $this->faker->numberBetween(3, 5) : $this->faker->numberBetween(5, 10),
            'ipWhitelist' => $isSecurityConscious ? ($this->faker->ipv4() . ',' . $this->faker->ipv4()) : null,

            // System settings - più variegati
            'currency' => $this->faker->randomElement(['EUR', 'USD', 'GBP', 'CHF']),
            'dateFormat' => $this->faker->randomElement(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']),
            'timeFormat' => $this->faker->randomElement(['24h', '12h']),
            'backupFrequency' => $this->faker->randomElement(['daily', 'weekly', 'monthly']),
            'maintenanceMode' => $this->faker->boolean(5), // Solo 5% in modalità manutenzione
        ];
    }
}
