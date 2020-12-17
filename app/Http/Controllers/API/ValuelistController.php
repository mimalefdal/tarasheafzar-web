<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Value;
use App\Http\Resources\DropdownItem;

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

            case 'gender':
                return DropdownItem::collection(Value::where('field','gender')->get());
                break;

            default:
                    return[];
                break;
        }
    }
}
