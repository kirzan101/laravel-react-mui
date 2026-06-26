<?php

use Illuminate\Support\Facades\Route;

// Route::get('/user-groups', [UserGroupController::class, 'index']);

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/user-groups', [\App\Http\Controllers\API\UserGroupApiController::class, 'index']);
    Route::get('/roles', [\App\Http\Controllers\API\RoleApiController::class, 'index']);
    Route::get('/users', [\App\Http\Controllers\API\UserApiController::class, 'index']);
    // Route::get('/modules', [\App\Http\Controllers\API\ModuleApiController::class, 'index']);

    // search
    Route::get('/user-groups/search', [\App\Http\Controllers\API\UserGroupApiController::class, 'searchIndex']);
    Route::get('/roles/search', [\App\Http\Controllers\API\RoleApiController::class, 'searchIndex']);
    // Route::get('/modules/search', [\App\Http\Controllers\API\ModuleApiController::class, 'searchIndex']);
});
