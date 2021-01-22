<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Resources\UnitItem;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function create(StoreUnitRequest $request)
    {
        return response(["message" => "Under Implementation", $request->all()], 200);
    }

    public function index()
    {
        return UnitItem::collection(Unit::with('hasunit')->get());
        return response(["message" => "Not Implemented"], 400);
    }

    public function show(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function update(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function delete(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }
}
