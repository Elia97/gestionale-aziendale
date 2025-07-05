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
        Schema::create(table: 'users', callback: function (Blueprint $table): void {
            $table->id();
            $table->string(column: 'firstName');
            $table->string(column: 'lastName')->nullable(); // opzionale, per nome completo
            $table->string(column: 'email')->unique();
            $table->timestamp(column: 'email_verified_at')->nullable();
            $table->string(column: 'phone')->nullable(); // opzionale, per contatti
            $table->string(column: 'password');
            $table->string(column: 'role')->default(value: 'operator'); // default a operatore
            $table->string(column: 'department')->nullable(); // opzionale, per il dipartimento
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'users');
    }
};
