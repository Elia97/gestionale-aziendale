<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    /** @use HasFactory<\Database\Factories\StockFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'warehouse_id',
        'quantity'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(related: Product::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(related: Warehouse::class);
    }

    public function getProductCodeAttribute(): ?string
    {
        return $this->product?->code;
    }

    public function getProductNameAttribute(): ?string
    {
        return $this->product?->name;
    }

    public function getProductPriceAttribute(): ?float
    {
        return $this->product?->price;
    }

    public function getWarehouseNameAttribute(): ?string
    {
        return $this->warehouse?->name;
    }
}
