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
        Schema::create(table: 'orders', callback: function (Blueprint $table): void {
            $table->id();
            $table->foreignId(column: 'customer_id')->constrained(table: 'customers')->onDelete(action: 'cascade');
            $table->foreignId(column: 'user_id')->constrained(table: 'users')->onDelete(action: 'cascade');
            $table->string(column: 'status')->default(value: 'pending');
            $table->decimal(column: 'total', total: 10, places: 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'orders');
    }
};
