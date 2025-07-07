<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\User;

class UserController extends Controller
{
    public function update(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        // Validazione dei campi modificabili
        $validated = $request->validate([
            'firstName'  => ['sometimes', 'required', 'string', 'max:255'],
            'lastName'   => ['sometimes', 'required', 'string', 'max:255'],
            'email'      => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone'      => ['sometimes', 'nullable', 'string', 'max:20'],

            // Dipartimento e ruolo sono modificabili solo da admin
            'department' => ['sometimes', 'string', Rule::in(['IT', 'Produzione', 'Logistica'])],
            'role'       => ['sometimes', 'string', Rule::in(['admin', 'operator'])],
        ]);

        // Se l'utente NON è admin, rimuovi 'role' e 'department' dall'update
        if (!$user->isAdmin()) {
            unset($validated['role']);
            unset($validated['department']);
        }

        // Aggiorna i campi permessi
        $user->update($validated);

        return response()->json([
            'message' => 'Profilo utente aggiornato con successo.',
            'user' => $user->fresh()
        ]);
    }
}
