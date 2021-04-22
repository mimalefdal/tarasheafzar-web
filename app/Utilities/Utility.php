<?php

use App\Models\Branch;
use App\Models\Department;
use App\Models\Position;
use App\Models\Right;
use App\Models\Role;
use App\Models\Staff;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class Utility
{

    public static function sortedObjectArray($array, string $attr, string $order = 'asc')
    {
        $array = collect($array);
        $sorted =  $array->sortBy($attr);
        return $sorted->values()->all();
    }

    public static function getModel($type)
    {
        switch ($type) {
            case 'position':
            case 'positions':
                return Position::class;
                break;

            case 'staff':
                return Staff::class;
                break;


            default:
                # code...
                break;
        }
    }

    public static function getHolderType($holderClass)
    {
        switch ($holderClass) {
            case null:
            case 'App\Models\Company':
                $item['holder'] = ['title' => resolve('Company')->shortTitle()];
                return 'company';
                // $item['holder_title'] = $item['holder']['title'][Lang::getLocale()];
                break;

            case 'App\Models\Branch':
                return 'branch';
                break;

            case 'App\Models\Department':
                return 'department';
                break;
            case 'App\Models\Unit':
                return 'unit';
                break;

            default:
                return 'unknown';
                break;
        }
    }

    public static function getHolder($holderType, $slug)
    {
        switch ($holderType) {
            case null:
            case 'company':
                $holder = null;
                break;
            case 'branch':
                $holder = Branch::where('slug', $slug)->first();
                break;
            case 'department':
                $holder = Department::where('slug', $slug)->first();
                break;
            case 'unit':
                $holder = Unit::where('slug', $slug)->first();
                break;
            default:
                break;
        }
        return $holder;
    }

    public static function getAllRights(array $rights)
    {
        return Right::whereIn('slug', $rights)->get();
    }

    public static function getAllRoles(array $roles)
    {
        return Role::whereIn('slug', $roles)->get();
    }

    public static function performParentChildStructure($data, $parentId = null)
    {
        $dataCollection = collect($data);
        $restructured = $dataCollection->where('parent_id', $parentId)->values()->all();
        foreach ($restructured as $key => $item) {
            $item['childs'] = self::performParentChildStructure($data, $item->id);
        }
        return $restructured;
    }


    public static function noItemResponse($type, $anyy = false)
    {
        if ($anyy)
            return response()->json(['message' => Lang::get('messages.noRecordsExists', ['type' => Lang::get('values.' . $type) . Lang::get('values.anyy')])], 203);
        return response()->json(['message' => Lang::get('messages.noRecordsExists', ['type' => Lang::get('values.' . $type) . Lang::get('values.any')])], 203);
    }

    public static function notImplementedResponse(Request $request = null)
    {
        if ($request)
            return response(["message" => Lang::get('messages.notImplemented'), $request->all()], 400);
        return response(["message" => Lang::get('messages.notImplemented')], 400);
    }
}
