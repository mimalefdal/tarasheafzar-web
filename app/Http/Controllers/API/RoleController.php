<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Resources\RoleDisplayItem;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Utility;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('allowed:perform-add-role')->only('create');
    }

    public function index()
    {
        return RoleDisplayItem::collection(Role::with('rights', 'staff', 'positions')->get());
    }

    public function create(StoreRoleRequest $request)
    {
        $newItem = new Role($request->all());
        $newItem->activation = 0;

        $newItem->validateUnity();
        $newItem->save();

        $request->user()->setOwnerOfRoles([$newItem->slug]);
        $request->user()->setManagerOfRoles([$newItem->slug]);

        $resourceItem = RoleDisplayItem::make($newItem);
        $message = \Lang::get('messages.recordـcreated', ['title' => $newItem->title[Lang::getLocale()]]);

        $data = ['message' => $message, 'position' => $resourceItem];
        return response()->json($data, 200);

        // return Utility::notImplementedResponse($request);
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return RoleDisplayItem::make(Role::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return RoleDisplayItem::make(Role::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
        return Utility::notImplementedResponse($request);
    }

    public function update(StoreRoleRequest $request)
    {
        // return $request->all();
        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedItem = new Role($request->all());
        $editedItem->id = $item['id'];

        $editedItem->validateUnity();
        //unity check passed

        //update record
        $item = Role::find($item['id']);

        if ($item->slug != $request->slug) {
            // TODO: this must been handled by an event
            $flagRelated = true;
            $oldSlug = $item->slug;
        }
        $item->update($request->all());

        //update related records if needed
        if ($flagRelated) {
        }

        $resourceItem = new RoleDisplayItem($item);
        $message = \Lang::get('messages.recordـupdated_with_type', ['title' => $item->title[Lang::getLocale()], 'type' => Lang::get('values.Role')]);
        $data = ['message' => $message, 'item' => $resourceItem, 'relations update' => $flagRelated];
        return response($data);

        return Utility::notImplementedResponse($request);
    }

    public function updateHolders(Request $request)
    {
        return Utility::notImplementedResponse($request);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Role::find($item['id']);
        $item->delete();

        $resourceItem = new RoleDisplayItem($item);
        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->title[Lang::getLocale()]]);
        $data = ['message' => $message, 'role' => $resourceItem];

        return response($data);
        return Utility::notImplementedResponse($request);
    }
}
