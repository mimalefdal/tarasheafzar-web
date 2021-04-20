<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RightDisplayItem;
use App\Models\Right;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
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
        // return Right::all();
    }

    public function updateAccessRights(Request $request)
    {
        // TDOD : check if requesting user has permission to manage rights

        // build requested right set
        $righIds = collect($request->get('rights'))->pluck('id');
        $requested_rights = collect(Right::whereIn('id', $righIds)->get());
        // $requested_rights = collect($requested_rights);

        // filter requested_rights
        // to restrict affected items from fake or wrong requests
        $manageable_rights = $request->user()->allManagedByRights()->pluck('slug')->toArray();
        $target_rights = $requested_rights->whereIn('slug', $manageable_rights)->pluck('slug')->toArray();
        $notAffected_rights = RightDisplayItem::collection($requested_rights->whereNotIn('slug', $manageable_rights));
        // return response()->json(['message' => 'developer Created error.please check console', 'manageable_rights' => $manageable_rights, 'requested_rights' => $requested_rights, 'target_rights' => $target_rights, 'notAffected_rights' => $notAffected_rights], 500);

        // set target objects
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
            $object->withdrawRightsTo($manageable_rights);
            $object->giveRightsTo($target_rights);
            // TODO : above command squence has to implement as atomic function
            // $object->save();
        }

        // send response
        return response()->json(['message' => Lang::get('messages.generalsuccess'), 'rights' => $request->get('rights'), 'notAffected_rights' => $notAffected_rights]);
    }
}
