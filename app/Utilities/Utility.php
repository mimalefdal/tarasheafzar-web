<?php

use App\Models\Branch;
use App\Models\Department;
use App\Models\Unit;

class Utility
{
    public static function getHolder($holderType, $slug)
    {
        switch ($holderType) {
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

    public static function noItemResponse($type, $anyy = false)
    {
        if ($anyy)
            return response()->json(['message' => Lang::get('messages.noRecordsExists', ['type' => Lang::get('values.' . $type) . Lang::get('values.anyy')])], 203);
        return response()->json(['message' => Lang::get('messages.noRecordsExists', ['type' => Lang::get('values.' . $type) . Lang::get('values.any')])], 203);
    }
}
