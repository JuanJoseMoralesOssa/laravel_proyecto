<?php

use App\Http\Controllers\CategoryVisualController;
use App\Http\Controllers\ProductVisualController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::resource('/products', ProductVisualController::class)
//     ->only(['index', 'store', 'update', 'destroy'])
//     ->middleware(['auth', 'verified']);

// Route::resource('/categories', CategoryVisualController::class)
//     ->only(['index', 'store', 'update', 'destroy'])
//     ->middleware(['auth', 'verified']);

Route::resource('/categories', CategoryVisualController::class)->middleware('auth');
Route::resource('/products', ProductVisualController::class)->middleware('auth');
Route::resource('/home', UserController::class)->middleware('auth');


Route::get('/', [
    ProductVisualController::class,
    'index',
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
])->name('products.index');
Route::get('/categories', [CategoryVisualController::class, 'index_all']);

Route::get('/products', [ProductVisualController::class, 'crud'])->name('products.crud')->middleware(['auth', 'verified']);

Route::get('/products/{product}', [ProductVisualController::class, 'show',])->name('products.show');
Route::get('/categories/{category}', [CategoryVisualController::class, 'show'])->name('categories.show');

require __DIR__ . '/auth.php';
