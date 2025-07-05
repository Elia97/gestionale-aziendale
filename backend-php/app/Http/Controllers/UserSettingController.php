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

            'emailNotifications' => ['required', 'boolean'],
            'pushNotifications' => ['required', 'boolean'],
            'smsNotifications' => ['required', 'boolean'],
            'orderUpdates' => ['required', 'boolean'],
            'stockAlerts' => ['required', 'boolean'],
            'systemMaintenance' => ['required', 'boolean'],
            'marketingEmails' => ['required', 'boolean'],

            'twoFactorAuth' => ['required', 'boolean'],
            'sessionTimeout' => ['required', 'integer', 'min:1'],
            'passwordExpiry' => ['required', 'integer', 'min:1'],
            'loginAttempts' => ['required', 'integer', 'min:1'],
            'ipWhitelist' => ['nullable', 'string'],

            'currency' => ['required', 'string', 'size:3'],
            'dateFormat' => ['required', 'string'],
            'timeFormat' => ['required', 'string'],
            'backupFrequency' => ['required', 'string'],
            'maintenanceMode' => ['required', 'boolean'],
        ]);

        $user = Auth::user();

        $user->userSetting->update($validated);

        return response()->json(['message' => 'Impostazioni aggiornate con successo.']);
    }
}
