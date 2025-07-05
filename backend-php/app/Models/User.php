<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'email_verified_at',
        'phone',
        'password',
        'role',
        'department',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function userSetting(): HasOne
    {
        return $this->hasOne(UserSetting::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isOperatore(): bool
    {
        return $this->role === 'operatore';
    }
}
