<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [\App\Http\Controllers\System\AuthController::class, 'index'])->name('login');
});

Route::post('/login', [\App\Http\Controllers\System\AuthController::class, 'login']);
Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [\App\Http\Controllers\System\AuthController::class, 'logout']);
    Route::put('/change-password', [\App\Http\Controllers\System\AuthController::class, 'changePassword'])->name('change-password');
    Route::put('/reset-password/{userId}', [\App\Http\Controllers\System\AuthController::class, 'resetPassword'])->name('reset-password');
    Route::put('/set-user-status/{userId}', [\App\Http\Controllers\System\AuthController::class, 'setUserStatus'])->name('set-user-status');

    Route::get('/', function () {
        return Inertia::render('Home');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Home');
    });

    Route::get('/settings', [\App\Http\Controllers\System\SettingsController::class, 'index'])->name('settings.index');

    Route::resource('users', \App\Http\Controllers\System\UserController::class)->only(['index', 'store', 'update']);
    Route::resource('user-groups', \App\Http\Controllers\System\UserGroupController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('roles', \App\Http\Controllers\System\RoleController::class)->only(['index', 'store', 'update', 'destroy']);
});

// Catch-all route for Inertia (must be defined last)
Route::get('{any}', function () {
    return Inertia::render('Error', [
        'code' => 404,
        'message' => 'The page you are looking for could not be found.',
    ]);
})->where('any', '.*');
