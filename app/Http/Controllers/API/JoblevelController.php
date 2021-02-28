<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJoblevelRequest;
use App\Http\Resources\JoblevelItem;
use App\Models\Joblevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class JoblevelController extends Controller
{
    public function create(StoreJoblevelRequest $request)
    {
        // return $request;
        $newItem = new Joblevel($request->all());
        // return response([$request->all(), $newItem], 400);

        $newItem->validateUnity();
        //unity check passed

        $newItem->save();
        $message = \Lang::get('messages.recordـcreated', ['title' => $newItem->typedTitle()]);


        return response(["message" => $message, 'joblevel' => $newItem], 200);
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function index()
    {
        return JoblevelItem::collection(Joblevel::all()->sortBy('priority'));
        return response(["message" => "Not Implemented"], 400);
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return JoblevelItem::make(Joblevel::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return JoblevelItem::make(Joblevel::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function update(StoreJoblevelRequest $request)
    {
        // return $request->all();
        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedItem = new Joblevel($request->all());
        $editedItem->id = $item['id'];

        $editedItem->validateUnity();
        //unity check passed

        //update record
        $item = Joblevel::find($item['id']);

        if ($item->slug != $request->slug) {
            // TODO: this must been handled by an event
            $flagRelated = true;
            $oldSlug = $item->slug;
        }
        $item->update($request->all());

        // return response(["message" => "Under Implementation", $item], 200);
        //update related records if needed
        if ($flagRelated) {
        }

        $resourceItem = new JoblevelItem($item);
        $message = \Lang::get('messages.recordـupdated_with_type', ['title' => $item->typedTitle(), 'type' => Lang::get('values.Joblevel')]);
        $data = ['message' => $message, 'item' => $resourceItem, 'relations update' => $flagRelated];
        return response($data);

        return response(["message" => "Not Implemented", $request], 400);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Joblevel::find($item['id']);
        $item->delete();

        $resourceItem = new JoblevelItem($item);
        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->typedTitle()]);
        $data = ['message' => $message, 'joblevel' => $resourceItem];

        return response($data);
        return response(["message" => "Not Implemented", $request], 400);
    }
}
