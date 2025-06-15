<?php

use App\Http\Controllers\WaProxyController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {

    Route::post('/wa/kirimpesan', [WaProxyController::class, 'forward']);
});
