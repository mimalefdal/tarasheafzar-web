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
        $newBranch = $this->makeNewBranchFromRequest($request);
        // return response([$request->all(), $newBranch], 250);

        $this->checkForUnity($newBranch);

        $newBranch->save();
        $branchItem = new BranchItem($newBranch);
        $title = $branchItem->type . ' ' . $branchItem->title;
        $message = \Lang::get('messages.recordـcreated', ['attribute' => \Lang::get('values.branch'), "title" => $title]);

        $data = ['message' => $message, 'branch' => $branchItem];
        return response()->json($data, 200);
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return new BranchItem(Branch::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return new BranchItem(Branch::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
    }

    public function update(StoreBranchRequest $request)
    {
        $item = $request->get('item');
        $editedBranch = $this->makeNewBranchFromRequest($request);
        $editedBranch->id = $item['id'];

        $this->checkForUnity($editedBranch);

        $branch = Branch::find($item['id']);
        $branch->update($request->all());
        $branch = new BranchItem($branch);
        $title = $branch->title_display;
        $message = \Lang::get('messages.recordـupdated', ['attribute' => \Lang::get('values.branch'), "title" => $title]);

        $data = ['message' => $message, 'branch' => $branch];
        return response($data);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Branch::find($item['id']);
        $item->delete();

        return response([
            'message' => 'Deleted',
            'item' => $item
        ], 200);
    }

    private function checkForUnity(Branch $branch)
    {
        $isUnique = $branch->isUnique();

        if (!$isUnique->check) {
            throw ValidationException::withMessages($isUnique->errors);
        }
    }

    private function makeNewBranchFromRequest($request)
    {
        return new Branch($request->all());
    }
}
