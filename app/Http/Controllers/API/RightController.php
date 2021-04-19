<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RightDisplayItem;
use App\Models\Right;
use Illuminate\Http\Request;
use Utility;

class RightController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:staff');
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $group = $request->get('group');
        // return response($group);
        switch ($group) {
            case 'owned':
                // return RightDisplayItem::collection($request->user()->allOwnedRights());
                return RightDisplayItem::collection(Utility::performParentChildStructure($request->user()->allOwnedRights()));
                break;

            case 'managedby':
                return RightDisplayItem::collection(Utility::performParentChildStructure($request->user()->allManagedByRights()));
                break;

            default:
                return [];
                break;
        }
        // return  Right::all();
    }

    public function updateAccessRights(Request $request)
    {
        // build right set
        $righIds = collect($request->get('rights'))->pluck('id');
        $rights = Right::whereIn('id', $righIds)->get();
        $rights = collect($rights)->pluck('slug')->toArray();

        // buid target objects
        $scope = $request->get('scope');
        $targetObjects = [];
        foreach ($scope as $item => $value) {
            $class = Utility::getModel($item);
            $ids = collect($value)->pluck('id');
            $objects = $class::whereIn('id', $ids)->get();
            array_push($targetObjects, ...$objects);
        }

        // attach rights for each object
        foreach ($targetObjects as $object) {
            $object->refreshRights($rights);
        }

        // send response
        return response()->json(['message' => 'marhaba', 'rights' => $request->get('rights')]);
    }
}
