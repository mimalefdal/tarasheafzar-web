<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');
    }

    public function show()
    {
        return response(resolve('Company')->get(), 200);
    }
}
