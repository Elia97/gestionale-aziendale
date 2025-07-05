<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('warehouses', WarehouseController::class);

    // Route per le giacenze dei magazzini
    Route::get('warehouses/{warehouse}/stocks', [WarehouseController::class, 'getStocks']);
    Route::patch('warehouses/{warehouse}/stocks', [WarehouseController::class, 'updateStocks']);

    Route::get('users/settings', [UserSettingController::class, 'show']);
    Route::patch('users/settings', [UserSettingController::class, 'update']);
});
