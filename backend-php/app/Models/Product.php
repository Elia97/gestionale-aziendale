<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'price',
    ];

    public function stocks(): HasMany
    {
        return $this->hasMany(related: Stock::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(related: OrderItem::class);
    }
}
