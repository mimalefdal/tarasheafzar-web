<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PositionItem;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function create(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function index()
    {
        return PositionItem::collection(Position::with(['hasposition', 'joblevel'])->get());
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
