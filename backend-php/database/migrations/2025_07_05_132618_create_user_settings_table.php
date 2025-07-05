<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('language')->default('it');
            $table->string('timezone')->default('Europe/Rome');

            // notification settings (boolean)
            $table->boolean('emailNotifications')->default(true);
            $table->boolean('pushNotifications')->default(true);
            $table->boolean('smsNotifications')->default(false);
            $table->boolean('orderUpdates')->default(true);
            $table->boolean('stockAlerts')->default(true);
            $table->boolean('systemMaintenance')->default(true);
            $table->boolean('marketingEmails')->default(false);

            // security settings
            $table->boolean('twoFactorAuth')->default(false);
            $table->unsignedSmallInteger('sessionTimeout')->default(30);
            $table->unsignedSmallInteger('passwordExpiry')->default(90);
            $table->unsignedSmallInteger('loginAttempts')->default(5);
            $table->string('ipWhitelist')->nullable();

            // system settings
            $table->string('currency')->default('EUR');
            $table->string('dateFormat')->default('DD/MM/YYYY');
            $table->string('timeFormat')->default('24h');
            $table->string('backupFrequency')->default('daily');
            $table->boolean('maintenanceMode')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
