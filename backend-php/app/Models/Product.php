<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\Category;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'price',
        'category'
    ];

    protected $casts = [
        'category' => Category::class,
        'price' => 'decimal:2',
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
