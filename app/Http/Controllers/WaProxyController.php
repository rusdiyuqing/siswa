<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WaProxyController extends Controller
{
    public function forward(Request $request)
    {
        // Validasi data yang masuk
        $validated = $request->validate([
            'number' => 'required|string',
            'pesan' => 'required|string',
            'idclient' => 'required|string',
        ]);

        // Kirim data ke API vittindo
        $response = Http::post('http://vittindo.my.id:8000/apiwa/kirimpesan', $validated);

        // Kembalikan response dari API tersebut
        return response()->json($response->json(), $response->status());
    }
}
