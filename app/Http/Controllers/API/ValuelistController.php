<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Value;
use App\Http\Resources\DropdownItem;
use App\Models\Branch;
use App\Models\Department;
use App\Models\Joblevel;
use App\Models\Unit;
use Illuminate\Support\Str;
use Lang;

class ValuelistController extends Controller
{
    public function index(Request $request)
    {
        $fields = $request->get('fields');

        foreach ($fields as $taggedField) {
            $splitted = Str::of($taggedField)->explode('.');
            $field = $splitted[0];
            count($splitted) > 1 ? $tag = $splitted[1] : $tag = null;
            $data[$field] = $this->getItems($field, $tag);
        }
        return $data;
    }

    private function getItems($field, $tag = null)
    {
        $lang = Lang::getLocale();
        switch ($field) {
            case 'position':
                return DropdownItem::collection(Position::all());
                break;

            case 'branch':
                return DropdownItem::collection(Branch::all());
                break;

            case 'department':
                return DropdownItem::collection(Department::orderBy('title', 'asc')->get());
                break;

            case 'unit':
                return DropdownItem::collection(Unit::orderBy('title', 'asc')->get());
                break;

            case 'joblevel':
                if ($tag == null)
                    return DropdownItem::collection(Joblevel::orderBy('priority', 'desc')->get());
                else
                    return DropdownItem::collection(Joblevel::where('scope', 'LIKE', '%' . $tag . '%')->orWhere('scope', null)->orderBy('priority', 'desc')->get());
                break;

            default:
                if ($tag !== null)
                    return DropdownItem::collection(Value::where('field', 'LIKE', $field)->where('tags', 'LIKE', '%' . $tag . '%')->get());
                return DropdownItem::collection(Value::where('field', 'LIKE', $field)->get());

                break;
        }
    }
}
