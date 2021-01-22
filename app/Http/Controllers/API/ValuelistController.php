<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Value;
use App\Http\Resources\DropdownItem;
use App\Models\Branch;
use App\Models\Department;
use Lang;

class ValuelistController extends Controller
{
    public function index(Request $request)
    {
        $fields = $request->get('fields');

        foreach ($fields as $field) {
            $data[$field] = $this->getItems($field);
        }
        return $data;
    }

    private function getItems($field)
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

            default:
                return DropdownItem::collection(Value::where('field', 'LIKE', $field)->get());
                break;
        }
    }
}
