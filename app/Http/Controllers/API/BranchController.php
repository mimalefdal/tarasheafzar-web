<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBranchRequest;
use App\Models\Branch;
use App\Http\Resources\BranchItem;
use Illuminate\Validation\ValidationException;

class BranchController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        return BranchItem::collection(Branch::all());
    }

    public function create(StoreBranchRequest $request)
    {
        $newBranch = new Branch([
            "slug" => $request['slug'],
            "type" => $request['type'],
            "title" => $request['title']
        ]);
        $isUnique = $newBranch->isUnique();

        if (!$isUnique->check) {
            throw ValidationException::withMessages($isUnique->errors);
        }

        $newBranch->save();
        $branchItem = new BranchItem($newBranch);
        $title = $branchItem->type . ' ' . $branchItem->title;
        $message = \Lang::get('messages.recordـcreated', ['attribute' => \Lang::get('values.branch'), "title" => $title]);

        $data = ['message' => $message, 'branch' => $branchItem];
        return response()->json($data, 200);
    }
}
