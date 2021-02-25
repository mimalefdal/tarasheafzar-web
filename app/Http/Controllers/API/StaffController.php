<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlockItem;
use App\Http\Resources\JoblevelItem;
use Illuminate\Http\Request;
use App\Models\Staff;


class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function scope(Request $request)
    {
        $scope = $request->user()->scope();

        $joblevelItem = JoblevelItem::make($scope['joblevel']);
        $holder = BlockItem::make($scope['holder']);
        $holder = $scope['holder'];

        return ['joblevel' => $joblevelItem, 'holder' => $holder];
    }

    public function index()
    {
        return Staff::whereNotNull('national_id')->with('position', 'position.roles')->get();
    }

    public function create(Request $request)
    {
        return $request;
    }

    public function show(Request $request)
    {
        return ['function must implement'];
    }
}
