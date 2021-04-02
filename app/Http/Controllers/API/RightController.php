<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
                return $request->user()->allOwnedRights();
                break;

            case 'managedby':
                return $request->user()->allManagedByRights();
                break;

            default:
                return [];
                break;
        }
        // return  Right::all();
    }
}
