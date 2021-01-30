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
        $newItem = new Unit($request->all());
        $newItem->setHasUnit($request->holder);
        // return response([$request->all(), $newItem], 250);

        $newItem->validateUnity();
        //unity check passed

        $newItem->save();
        $resourceItem = new UnitItem($newItem);

        $message = \Lang::get('messages.recordـcreated', ['title' => $newItem->fullTitle()]);
        // $message = \Lang::get('messages.newrecordـcreated', ['attribute' => Value::getLocalValue($type)]);

        $data = ['message' => $message, 'unit' => $resourceItem];
        return response()->json($data, 200);

        // return response(["message" => "Under Implementation", $newItem], 400);
    }

    public function index()
    {
        return UnitItem::collection(Unit::with('hasunit')->get());
        return response(["message" => "Not Implemented"], 400);
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return new UnitItem(Unit::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return new UnitItem(Unit::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function update(StoreUnitRequest $request)
    {
        // return $request->all();
        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedItem = new Unit($request->all());
        $editedItem->id = $item['id'];
        $editedItem->setHasUnit($request->holder);

        $editedItem->validateUnity();
        //unity check passed

        //update record
        $item = Unit::find($item['id']);

        if ($item->slug != $request->slug) {
            // TODO: this must been handled by an event
            $flagRelated = true;
            $oldSlug = $item->slug;
        }
        $item->setHasUnit($request->holder);
        $item->update($request->all());

        return response(["message" => "Under Implementation", $item], 200);
        //update related records if needed
        if ($flagRelated) {
        }

        $resourceItem = new UnitItem($item);
        $message = \Lang::get('messages.recordـupdated', ['title' => $item->fullTitle()]);
        $data = ['message' => $message, 'department' => $resourceItem, 'relations update' => $flagRelated];
        return response($data);

        // return response(["message" => "Not Implemented", $request->all()], 400);

    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Unit::find($item['id']);
        $item->delete();

        $resourceItem = new UnitItem($item);
        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->fullTitle()]);
        $data = ['message' => $message, 'unit' => $resourceItem];

        return response($data);
        return response(["message" => "Not Implemented", $request], 400);
    }
}
