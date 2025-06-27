<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate(rules: [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt(credentials: $credentials)) {
            return response()->json(data: ['message' => 'Invalid credentials'], status: 401);
        }

        /** @var \App\Models\User $user */
        $user  = $request->user();
        $token = $user->createToken(name: 'api-token')->plainTextToken;

        return response()->json(data: [
            'token' => $token,
            'user'  => $user,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(data: ['message' => 'Logged out']);
    }
}
