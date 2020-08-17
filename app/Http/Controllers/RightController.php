<?php

namespace App\Http\Controllers;

use App\Models\Right;
use Illuminate\Http\Request;

class RightController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:staff');
        $this->middleware('auth:sanctum');
    }
    //
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'slug' => 'unique:rights'
        ]);

        $right = new Right;
        $right->slug = $request->slug;
        $right->title = $request->title;
        $right->title_fa = $request->title_fa;
        $right->activation = $request->activation;

        $right->save();
        return response('New Right Successfully Added');
    }
}
