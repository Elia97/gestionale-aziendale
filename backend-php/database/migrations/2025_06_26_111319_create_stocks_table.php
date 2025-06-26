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
        Schema::create(table: 'stocks', callback: function (Blueprint $table): void {
            $table->id();
            $table->foreignId(column: 'product_id')->constrained(table: 'products')->onDelete(action: 'cascade');
            $table->foreignId(column: 'warehouse_id')->constrained(table: 'warehouses')->onDelete(action: 'cascade');
            $table->unsignedInteger(column: 'quantity')->default(value: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'stocks');
    }
};
