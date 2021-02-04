<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeatureController extends Controller

{
    public function __construct()
    {
        $this->middleware('auth:sanctum');

        $path = base_path() . '/public/data/systemInfo.json';
        $systemInfo = file_get_contents($path);
        $systemInfo = json_decode($systemInfo, true);
    }
}
