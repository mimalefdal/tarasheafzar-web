<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlockItem;
use App\Http\Resources\JoblevelItem;
use Illuminate\Http\Request;

class DirtyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function scope(Request $request)
    {
        // return $request->user();
        $scope = $request->user()->scope();

        // return $scope;

        $joblevelItem = JoblevelItem::make($scope['joblevel']);
        $holder = BlockItem::make($scope['holder']);


        if (isset($scope['childBlocks'])) {
            $childBlocks = [];
            foreach ($scope['childBlocks'] as $blockType => $childs) {
                $childBlocks[$blockType] = BlockItem::collection($childs);
            }
            return ['joblevel' => $joblevelItem, 'holder' => $holder, 'childBlocks' => $childBlocks];
        }
        return ['joblevel' => $joblevelItem, 'holder' => $holder];
    }
}
