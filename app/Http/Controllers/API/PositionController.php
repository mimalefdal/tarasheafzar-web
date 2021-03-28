<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePositionRequest;
use App\Http\Resources\PositionItem;
use App\Models\Joblevel;
use App\Models\Position;
use Illuminate\Http\Request;
use Lang;

class PositionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('allowed:perform-add-position')->only('create');
        $this->middleware('allowed:perform-view-position')->only('show');
        $this->middleware('allowed:perform-edit-position')->only('update');
        $this->middleware('allowed:perform-delete-position')->only('delete');
    }

    public function create(StorePositionRequest $request)
    {
        $newItem = new Position($request->all());
        $newItem->setHasPosition($request->holder);
        $newItem->joblevel()->associate(Joblevel::find($request->joblevel_id));
        // return response([$request->all(), $newItem], 400);

        $newItem->validateUnity();
        //unity check passed

        $newItem->save();
        $resourceItem = new PositionItem($newItem);

        $message = \Lang::get('messages.recordـcreated', ['title' => $newItem->fullTitle()]);
        // $message = \Lang::get('messages.newrecordـcreated', ['attribute' => Value::getLocalValue($type)]);

        $data = ['message' => $message, 'position' => $resourceItem];
        return response()->json($data, 200);

        return response(["message" => "Not Implemented", $newItem], 400);
    }

    public function index()
    {
        return PositionItem::collection(Position::with(['hasposition', 'joblevel'])->get());
        return response(["message" => "Not Implemented"], 400);
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return PositionItem::make(Position::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return PositionItem::make(Position::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function update(StorePositionRequest $request)
    {
        // return $request->all();
        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedItem = new Position($request->all());
        $editedItem->id = $item['id'];
        $editedItem->setHasPosition($request->holder);

        $editedItem->validateUnity();
        //unity check passed

        //update record
        $item = Position::find($item['id']);

        if ($item->slug != $request->slug) {
            // TODO: this must been handled by an event
            $flagRelated = true;
            $oldSlug = $item->slug;
        }
        $item->setHasPosition($request->holder);
        $item->update($request->all());

        // return response(["message" => "Under Implementation", $item], 200);
        //update related records if needed
        if ($flagRelated) {
        }

        $resourceItem = new PositionItem($item);
        $message = \Lang::get('messages.recordـupdated_with_type', ['title' => $item->fullTitle(), 'type' => Lang::get('values.Position')]);
        $data = ['message' => $message, 'item' => $resourceItem, 'relations update' => $flagRelated];
        return response($data);

        // return response(["message" => "Not Implemented", $request->all()], 400);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Position::find($item['id']);
        $item->delete();

        $resourceItem = new PositionItem($item);
        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->fullTitle()]);
        $data = ['message' => $message, 'position' => $resourceItem];

        return response($data);
        return response(["message" => "Not Implemented", $request->all()], 400);
    }
}
