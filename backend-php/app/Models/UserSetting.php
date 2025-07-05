<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    /** @use HasFactory<\Database\Factories\UserSettingFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'language',
        'timezone',
        'emailNotifications',
        'pushNotifications',
        'smsNotifications',
        'orderUpdates',
        'stockAlerts',
        'systemMaintenance',
        'marketingEmails',
        'twoFactorAuth',
        'sessionTimeout',
        'passwordExpiry',
        'loginAttempts',
        'ipWhitelist',
        'currency',
        'dateFormat',
        'timeFormat',
        'backupFrequency',
        'maintenanceMode'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
