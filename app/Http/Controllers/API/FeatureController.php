<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeatureToolsItem;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $collection = FeatureToolsItem::collection(Feature::with('tools')->get());
        $collection = $collection->sortBy('title');
        $collection = $collection->values()->all();
        return $collection;

        return FeatureToolsItem::collection(Feature::with('tools')->get());
    }
}
