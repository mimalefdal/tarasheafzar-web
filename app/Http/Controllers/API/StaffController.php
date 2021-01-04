<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Staff;


class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        return Staff::with('position', 'position.roles')->get();
    }

    public function create(Request $request)
    {
        return $request;
    }
}
