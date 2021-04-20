<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Resources\StaffManageDisplayItem;
use App\Http\Resources\StaffManageEditItem;
use Illuminate\Http\Request;
use App\Models\Staff;
use Utility;

class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('allowed:perform-add-staff')->only('create');
        $this->middleware('allowed:perform-view-staff')->only('show');
        $this->middleware('allowed:perform-edit-staff')->only('update');
        $this->middleware('allowed:perform-delete-staff')->only('delete');
        $this->middleware('allowed:perform-suspend-staff')->only('suspend');
    }

    public function create(StoreStaffRequest $request)
    {
        $newItem = new Staff($request->all());
        $newItem->setPosition($request->position);
        $newItem->save();

        $resourceItem = StaffManageDisplayItem::make($newItem);

        $message = \Lang::get('messages.recordـcreated_with_type', ['title' => $newItem->getFullNameAttribute(), 'type' => \Lang::get('values.Staff_s')]);

        $data = ['message' => $message, 'staff' => $resourceItem];
        return response()->json($data, 200);

        return response(["message" => "Not Implemented", $newItem], 400);
    }

    public function index()
    {
        return StaffManageDisplayItem::collection(Staff::whereNotNull('national_id')->with('position', 'position.roles')->get());
        return response(["message" => "Not Implemented"], 400);
    }

    public function getStaffCrew(Request $request)
    {
        $mode = $request->get('mode');
        if (!$mode) return response(["message" => "Scope : mode not set"], 400);
        $staffCrew = StaffManageDisplayItem::collection($request->user()->staffCrew($mode));
        // return $staffCrew;

        $sortBy = $request->get('sortBy');
        if (!$sortBy || $sortBy == '') {
            $staffCrew = collect($staffCrew);
            $sorted =  $staffCrew->sortBy('id');
            return $sorted->values()->all();
        }
        $staffCrew = collect($staffCrew);
        $sorted =  $staffCrew->sortBy($sortBy);
        return $sorted->values()->all();

        return response(["message" => "Not Implemented"], 400);
    }

    public function show(Request $request)
    {
        $resourceClass = StaffManageDisplayItem::class;
        if ($request->has('mode')) {
            switch ($request->get('mode')) {
                case 'editByManager':
                    $resourceClass = StaffManageEditItem::class;
                    break;

                default:
                    # code...
                    break;
            }
        }
        if ($request->has('id')) {
            $staffQuery = Staff::withTrashed()->where('id', $request->id);
        } elseif ($request->has('personnel_id')) {
            $staffQuery = Staff::withTrashed()->where('personnel_id', $request->personnel_id);
        } elseif ($request->has('username')) {
            $staffQuery = Staff::withTrashed()->where('username', $request->username);
        };

        $staff = $staffQuery->with(['position.hasposition'])->firstOrFail();
        $staff['rights'] = $staff->allRights();
        // $staff['rights'] = Utility::performParentChildStructure($staff->allRights());
        if ($resourceClass == null)
            return $staff;
        return $resourceClass::make($staff);

        return Utility::notImplementedResponse($request);
    }

    public function update(StoreStaffRequest $request)
    {

        // $newItem = new Staff($request->all());
        // $newItem->setPosition($request->position);

        // TODO : this authorization must replaced by automated determinition of required right via feature/tool/operation structure
        // if (!$request->user()->can('perform-edit-staff')) return response(["message" => \Lang::get("messages.unathorized"), $request->all()], 403);

        $item = Staff::find($request->item['id']);

        $item->setPosition($request->position);
        $item->update($request->all());

        $resourceItem = StaffManageEditItem::make($item);

        $message = \Lang::get('messages.recordـupdated_with_type', ['title' => $item->getFullNameAttribute(), 'type' => \Lang::get('values.Account')]);
        $data = ['message' => $message, 'staff' => $resourceItem];
        return response($data);

        return response(["message" => "Not Implemented", $item], 400);
    }

    public function delete(Request $request)
    {
        // TODO : this authorization must replaced by automated determinition of required right via feature/tool/operation structure
        // if (!$request->user()->can('delete-staff')) return response(["message" => \Lang::get("messages.unathorized"), $request->all()], 403);

        $item = $request->item;
        $item = Staff::find($item['id']);
        $item->delete();

        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->getFullNameAttribute()]);
        $data = ['message' => $message];

        return response($data);
        return Utility::notImplementedResponse($request);
    }

    public function restore(Request $request)
    {
        // $item = $request->item;
        // $item = Staff::find($item['id']);

        // $message = \Lang::get('messages.recordـdeleted', ['title' => $item->getFullNameAttribute()]);
        // $data = ['message' => $message];

        // return response($data);
        return Utility::notImplementedResponse($request);
    }

    public function toggleSuspend(Request $request)
    {
        $item = $request->item;
        $item = Staff::find($item['id']);

        $item->suspended = !$item->suspended;
        $item->save();

        $resourceItem = StaffManageDisplayItem::make($item);

        $message = \Lang::get('messages.recordـupdated', ['title' => $item->getFullNameAttribute()]);
        $data = ['message' => $message, 'staff' => $resourceItem];

        return response($data);
        return Utility::notImplementedResponse($request);
    }
}
