<?php

namespace App\Http\Controllers;

use App\Models\Indentitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;
use App\Models\Otp;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OtpController extends Controller
{
    protected $maxAttempts = 3;
    protected $decayMinutes = 5;
    protected $WAPI_URL;
    protected $WAPI_DEVICE_ID;
    protected $WAPI_USER;
    protected $WAPI_SK;

    public function __construct()
    {
        $this->WAPI_URL = env('WAPI_URL');
        $this->WAPI_DEVICE_ID = env('WAPI_DEVICE_ID');
        $this->WAPI_USER = env('WAPI_USER');
        $this->WAPI_SK = env('WAPI_SK');
    }
    public function forgotRequestOtp(Request $request, $nouid)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        $indentitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $indentitas->siswa()->first();
        $phone = $this->formatPhoneNumber($request->phone);
        if ($siswa->tel !== $phone) {
            return back()->withErrors([
                'message' => 'Nomor telepon yang Anda masukkan Salah',
            ]);
        }
        return route('otp.send', $nouid);
    }
    public function sendOtp(Request $request, $nouid)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        $phone = $this->formatPhoneNumber($request->phone);

        if (RateLimiter::tooManyAttempts('send-otp:' . $phone, $this->maxAttempts)) {
            throw ValidationException::withMessages([
                'phone' => ['Terlalu banyak permintaan OTP. Silakan coba lagi nanti.']
            ]);
        }

        $otp = rand(100000, 999999);
        $expiresAt = now()->addMinutes(5);

        try {
            Otp::updateOrCreate(
                ['phone' => $phone],
                ['otp' => $otp, 'expires_at' => $expiresAt]
            );
        } catch (\Exception $e) {
            Log::error('Gagal menyimpan OTP', ['error' => $e->getMessage()]);
            return back()->withErrors(['message' => 'Gagal menghasilkan OTP']);
        }

        $message = "Kode OTP Anda: $otp, berlaku 5 menit.";
        $payload = [
            "user_code" => $this->WAPI_USER,
            "device_id" => $this->WAPI_DEVICE_ID,
            "receiver" => $phone,
            "message" => $message,
            "secret" => $this->WAPI_SK,

        ];
        try {
            $response = Http::timeout(10)->post($this->WAPI_URL, $payload);

            RateLimiter::hit('send-otp:' . $phone, $this->decayMinutes * 60);
            // Logging yang lebih baik
            logger('WhatsApp API Response', [
                'status' => $response->status(),
                'response' => $response->json(),
                'payload' => $payload,
                'phone' => $phone
            ]);            // Return Inertia response with flash message
            return back()->with([
                'message' => 'OTP berhasil dikirim',
                'expiresAt' => $expiresAt->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            logger()->error('WhatsApp API Error', [
                'error' => $e->getMessage(),
                'payload' => $payload,
                'phone' => $phone,
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['message' => 'Gagal mengirim OTP']);
        }
    }

    public function verifyOtp(Request $request, $nouid)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string|digits:6'
        ]);

        $phone = $this->formatPhoneNumber($request->phone);

        if (RateLimiter::tooManyAttempts('verify-otp:' . $phone, $this->maxAttempts)) {
            throw ValidationException::withMessages([
                'otp' => ['Terlalu banyak percobaan. Silakan coba lagi nanti.']
            ]);
        }

        $record = Otp::where('phone', $phone)->first();

        if (!$record) {
            RateLimiter::hit('verify-otp:' . $phone, $this->decayMinutes * 60);
            throw ValidationException::withMessages([
                'otp' => ['OTP tidak ditemukan']
            ]);
        }

        if (Carbon::now()->gt($record->expires_at)) {
            throw ValidationException::withMessages([
                'otp' => ['OTP telah kadaluarsa']
            ]);
        }

        if ($record->otp !== $request->otp) {
            $record->increment('attempts');
            $remainingAttempts = $this->maxAttempts - $record->attempts;

            RateLimiter::hit('verify-otp:' . $phone, $this->decayMinutes * 60);

            throw ValidationException::withMessages([
                'otp' => ["OTP salah. Sisa percobaan: $remainingAttempts"]
            ]);
        }

        try {
            $record->update(['verified_at' => now()]);
            RateLimiter::clear('verify-otp:' . $phone);
            Otp::where('expires_at', '<', now())->delete();
            $record->delete();

            return back()->with([
                'message' => 'OTP berhasil diverifikasi'
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal verifikasi OTP', ['error' => $e->getMessage()]);
            return back()->withErrors(['message' => 'Gagal verifikasi OTP']);
        }
    }

    protected function formatPhoneNumber($number)
    {
        $number = preg_replace('/[^0-9]/', '', $number);
        if (strpos($number, '0') === 0) {
            $number = substr($number, 1);
        } elseif (strpos($number, '62') === 0) {
            $number = substr($number, 2);
        }
        return '62' . $number;
    }
}
