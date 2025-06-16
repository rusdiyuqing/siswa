<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['web', 'verify.nouid'])->group(function () {
    Route::prefix('/{nouid}')->group(function () {
        Route::get('/', [SiswaController::class, 'index'])->name('siswa.index');
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('siswa.logout');
        Route::post('/verify-pin', [AuthenticatedSessionController::class, 'store'])->name('siswa.verify-pin');
        Route::post('/register-phone', [RegisteredUserController::class, 'verifphone'])->name('siswa.verify-nope');
        Route::get('/setup-pin', [SiswaController::class, 'showSetupPinForm'])->name('siswa.show-setup-pin');
        Route::post('/setup-pin', [RegisteredUserController::class, 'store'])->name('siswa.process-setup-pin');
        Route::get('/lupa-pin', [PasswordResetLinkController::class, 'create'])->name('siswa.show-lupa-pin');
        Route::post('/lupa-pin', [OtpController::class, 'forgotRequestOtp'])->name('siswa.forgot-pin');
        Route::post('/otp/send', [OtpController::class, 'sendOtp'])->name('otp.send');
        Route::post('/otp/verify', [OtpController::class, 'verifyOtp'])->name('otp.verif');
    });
});


require __DIR__ . '/settings.php';
// require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
