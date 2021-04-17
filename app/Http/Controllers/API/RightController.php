<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RightDisplayItem;
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
        return response()->json(['message' => 'marhaba', 'rights' => $request->rights]);
    }
}
