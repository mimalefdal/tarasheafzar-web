<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Right;
use App\Models\Role;
use Illuminate\Http\Request;

class RightController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:staff');
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        // return $request->user()->allManagedByRights();
        return Right::all();
    }
}
