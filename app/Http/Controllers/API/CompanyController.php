<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyGeneralInfo;

class CompanyController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');
    }

    public function show()
    {
        return response(CompanyGeneralInfo::make(resolve('Company')), 200);
    }
}
