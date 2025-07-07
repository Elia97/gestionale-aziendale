<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSettingController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('warehouses', WarehouseController::class);


    Route::get('warehouses/{warehouse}/stocks', [WarehouseController::class, 'getStocks']);
    Route::patch('warehouses/{warehouse}/stocks', [WarehouseController::class, 'updateStocks']);

    Route::patch('users', [UserController::class, 'update']);
    Route::get('users/settings', [UserSettingController::class, 'show']);
    Route::put('users/settings', [UserSettingController::class, 'update']);
});
