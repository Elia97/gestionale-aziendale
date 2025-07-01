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

    /**
     * Relazioni
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Attributi calcolati (appends)
     */
    protected $appends = [
        'customer_name',
        'customer_email',
        'user_name',
    ];

    public function getCustomerNameAttribute(): ?string
    {
        return $this->customer?->name;
    }

    public function getCustomerEmailAttribute(): ?string
    {
        return $this->customer?->email;
    }

    public function getUserNameAttribute(): ?string
    {
        return $this->user?->name;
    }

    /**
     * Cast automatico per formattare created_at come stringa standard
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];
}
