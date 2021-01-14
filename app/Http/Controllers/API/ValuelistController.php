<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Value;
use App\Http\Resources\DropdownItem;
use App\Models\Branch;

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
        switch ($field) {
            case 'position':
                return DropdownItem::collection(Position::all());
                break;

            case 'branch':
                return DropdownItem::collection(Branch::all());
                break;

            default:
                return DropdownItem::collection(Value::where('field', $field)->get());
                break;
        }
    }
}
