<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserSettingController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return response()->json($user->userSetting);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'language' => ['required', 'string', 'in:it,en,de'],
            'timezone' => ['required', 'string'],

            'emailNotifications' => ['required', 'in:0,1,true,false'],
            'pushNotifications' => ['required', 'in:0,1,true,false'],
            'smsNotifications' => ['required', 'in:0,1,true,false'],
            'orderUpdates' => ['required', 'in:0,1,true,false'],
            'stockAlerts' => ['required', 'in:0,1,true,false'],
            'systemMaintenance' => ['required', 'in:0,1,true,false'],
            'marketingEmails' => ['required', 'in:0,1,true,false'],

            'twoFactorAuth' => ['required', 'in:0,1,true,false'],
            'sessionTimeout' => ['required', 'integer', 'min:1'],
            'passwordExpiry' => ['required', 'integer', 'min:1'],
            'loginAttempts' => ['required', 'integer', 'min:1'],
            'ipWhitelist' => ['nullable', 'string'],

            'currency' => ['required', 'string', 'size:3'],
            'dateFormat' => ['required', 'string'],
            'timeFormat' => ['required', 'string'],
            'backupFrequency' => ['required', 'string'],
            'maintenanceMode' => ['required', 'in:0,1,true,false'],
        ]);

        // Converte i valori boolean in 0/1 per il database
        $booleanFields = [
            'emailNotifications',
            'pushNotifications',
            'smsNotifications',
            'orderUpdates',
            'stockAlerts',
            'systemMaintenance',
            'marketingEmails',
            'twoFactorAuth',
            'maintenanceMode'
        ];

        foreach ($booleanFields as $field) {
            if (isset($validated[$field])) {
                $validated[$field] = filter_var($validated[$field], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
            }
        }

        $user = Auth::user();

        $user->userSetting->update($validated);

        return response()->json($user->userSetting->fresh());
    }
}
