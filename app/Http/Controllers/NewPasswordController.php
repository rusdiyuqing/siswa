<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request, $nouid): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'nouid' => $nouid,
            'token' => $request->route('token'),
            'phone' => $request->query('phone'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     */
    public function store(Request $request, $nouid): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'phone' => 'required|string',
            'pin' => ['required', 'string', 'min:6', 'max:6', 'confirmed', 'regex:/^[0-9]+$/'],
        ]);

        // Find the user
        $siswa = Siswa::where('tel', $request->phone)
            ->whereHas('indentitas', function($query) use ($nouid) {
                $query->where('nouid', $nouid);
            })
            ->firstOrFail();

        // Update the PIN directly
        $siswa->update([
            'pin' => Hash::make($request->pin),
            'pin_updated_at' => now(),
        ]);

        // Invalidate the token
        Password::deleteToken($siswa);

        return redirect()->route('login')->with('status', 'PIN Anda berhasil direset!');
    }
}