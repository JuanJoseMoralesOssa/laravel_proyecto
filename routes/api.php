<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/products', ProductController::class)->middleware('auth:sanctum');
Route::apiResource('/categories', CategoryController::class)->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'login']);

// Route::get('/csrf-token', function () {
//     return response()->json(['csrf_token' => csrf_token()]);
// })->middleware(['auth:sanctum']);
