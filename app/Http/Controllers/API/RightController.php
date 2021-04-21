<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RightDisplayItem;
use App\Models\Right;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Response;
use Utility;

class RightController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:staff');
        $this->middleware('auth:sanctum');
        $this->middleware('allowed:perform-manage-access-rights')->only('updateAccessRights');
        $this->middleware('allowed:perform-administrate-managedby-rights')->only('updateManagedbyRights');
        $this->middleware('allowed:perform-administrate-ownedby-rights')->only('updateOwnedbyRights');
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
        // build requested right set
        $requested_rights = $this->getRightObjects($request->get('rights'));

        // filter requested_rights
        // to restrict affected items from fake or wrong requests
        $manageable_rights = $request->user()->allManagedByRights()->pluck('slug')->toArray();
        $affected_rights = $requested_rights->whereIn('slug', $manageable_rights)->pluck('slug')->toArray();
        $notAffected_rights = $requested_rights->whereNotIn('slug', $manageable_rights);

        // get target objects
        $targetObjects = $this->getScopeObjects($request->get('scope'));

        // attach rights for each object
        foreach ($targetObjects as $object) {
            $object->withdrawRightsTo($manageable_rights);
            $object->giveRightsTo($affected_rights);
            // TODO : above command squence has to implement as atomic function
            // $object->save();
        }

        // send response
        return response()->json(['message' => Lang::get('messages.generalsuccess'), 'rights' => RightDisplayItem::collection($requested_rights), 'notAffected_rights' => RightDisplayItem::collection($notAffected_rights)]);
    }

    public function updateManagedbyRights(Request $request)
    {
        // build requested right set
        $requested_rights = $this->getRightObjects($request->get('rights'));

        // filter requested_rights
        // to restrict affected items from fake or wrong requests
        $owned_rights = $request->user()->allOwnedRights()->pluck('slug')->toArray();
        $affected_rights = $requested_rights->whereIn('slug', $owned_rights)->pluck('slug')->toArray();
        $notAffected_rights = $requested_rights->whereNotIn('slug', $owned_rights);

        // get target objects
        $targetObjects = $this->getScopeObjects($request->get('scope'));

        // attach rights for each object
        foreach ($targetObjects as $object) {
            $object->unsetManagerOfRights($owned_rights);
            $object->setManagerOfRights($affected_rights);
            // TODO : above command squence has to implement as atomic function
            // $object->save();
        }

        // send response
        return response()->json(['message' => Lang::get('messages.generalsuccess'), 'rights' => RightDisplayItem::collection($requested_rights), 'notAffected_rights' => RightDisplayItem::collection($notAffected_rights)]);
        return Utility::notImplementedResponse($request);
    }

    public function updateOwnedbyRights(Request $request)
    {
        // build requested right set
        $requested_rights = $this->getRightObjects($request->get('rights'));

        // filter requested_rights
        // to restrict affected items from fake or wrong requests
        $owned_rights = $request->user()->allOwnedRights()->pluck('slug')->toArray();
        $affected_rights = $requested_rights->whereIn('slug', $owned_rights)->pluck('slug')->toArray();
        $notAffected_rights = $requested_rights->whereNotIn('slug', $owned_rights);

        // get target objects
        $targetObjects = $this->getScopeObjects($request->get('scope'));

        // attach rights for each object
        foreach ($targetObjects as $object) {
            $object->unsetOwnerOfRights($owned_rights);
            $object->setOwnerOfRights($affected_rights);
            // TODO : above command squence has to implement as atomic function
            // $object->save();
        }

        // send response
        return response()->json(['message' => Lang::get('messages.generalsuccess'), 'rights' => RightDisplayItem::collection($requested_rights), 'notAffected_rights' => RightDisplayItem::collection($notAffected_rights)]);
        return Utility::notImplementedResponse($request);
    }

    private function getScopeObjects($scope)
    {
        $targetObjects = [];
        foreach ($scope as $item => $value) {
            $class = Utility::getModel($item);
            $ids = collect($value)->pluck('id');
            $objects = $class::whereIn('id', $ids)->get();
            array_push($targetObjects, ...$objects);
        }

        return $targetObjects;
    }

    private function getRightObjects($rightIds)
    {
        $righIds_array = collect($rightIds)->pluck('id');
        return collect(Right::whereIn('id', $righIds_array)->get());
    }
}
