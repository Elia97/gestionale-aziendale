<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    protected $casts = [
        'orders_count' => 'integer',
        'total_spent' => 'float',
    ];


    public function orders(): HasMany
    {
        return $this->hasMany(related: Order::class);
    }
}
