<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeatureItem;
use App\Models\Feature;

class FeatureController extends Controller

{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $collection = FeatureItem::collection(Feature::with('tools')->get());
        $collection = $collection->sortBy('title');
        $collection = $collection->values()->all();
        return $collection;

        return FeatureItem::collection(Feature::with('tools.operations')->get());
    }
}
