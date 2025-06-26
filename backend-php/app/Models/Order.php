<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'user_id',
        'status',
        'total',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(related: Customer::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(related: OrderItem::class);
    }
}
