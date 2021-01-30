<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePositionRequest;
use App\Http\Resources\PositionItem;
use App\Models\Joblevel;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function create(StorePositionRequest $request)
    {
        $newItem = new Position($request->all());
        $newItem->setHasPosition($request->holder);
        $newItem->joblevel()->associate(Joblevel::find($request->joblevel_id));
        // return response([$request->all(), $newItem], 250);

        $newItem->validateUnity();
        //unity check passed

        return response(["message" => "Not Implemented", $newItem], 400);
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
