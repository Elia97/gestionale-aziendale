<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    /** @use HasFactory<\Database\Factories\OrderItemFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    /**
     * Relazioni
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Attributi calcolati (appends)
     */
    protected $appends = [
        'product_code',
        'product_name',
    ];

    public function getProductCodeAttribute(): ?string
    {
        return $this->product?->code;
    }

    public function getProductNameAttribute(): ?string
    {
        return $this->product?->name;
    }
}
