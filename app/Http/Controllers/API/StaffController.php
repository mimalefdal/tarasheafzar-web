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
        return Staff::with('roles.rights','roles.unit.department','rights')->get();
    }

    public function create(Request $request)
    {
        return $request;
    }
}
