<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WaController extends Controller
{
    public function test()
    {
        $response = Http::post('http://vittindo.my.id:8000/apiwa/kirimpesan', [
            'number' => '081808856626',
            'pesan' => 'test post pesan',
            'idclient' => '13',
            'idpesan' => '',
            'idwa' => ''
        ]);

        return ($response->json());
    }
}
