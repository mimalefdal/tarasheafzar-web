<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBranchRequest;
use App\Models\Branch;
use App\Http\Resources\BranchItem;
use App\Models\Value;
use Debugbar;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BranchController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function create(StoreBranchRequest $request)
    {
        $newBranch = new Branch($request->all());
        // return response([$request->all(), $newBranch], 250);

        $newBranch->validateUnity();
        //unity check passed

        $newBranch->save();
        $branchItem = new BranchItem($newBranch);

        // $message = \Lang::get('messages.recordـcreated', ['attribute' => \Lang::get('values.' . $type->title)]);
        $message = \Lang::get('messages.recordـcreated', ['title' => $branchItem->full_title]);
        $data = ['message' => $message, 'branch' => $branchItem];
        return response()->json($data, 200);
    }

    public function index()
    {
        return BranchItem::collection(Branch::all());
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

        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedBranch = new Branch($request->all());
        $editedBranch->id = $item['id'];

        $editedBranch->validateUnity();
        //unity check passed

        //update record
        $branch = Branch::find($item['id']);
        if ($branch->slug != $request->slug) {
            $flagRelated = true;
            $oldSlug = $branch->slug;
        }
        $branch->update($request->all());

        //update related records if needed
        if ($flagRelated) {
            $relatedDepartments = $branch->departments;
            foreach ($relatedDepartments as $department) {
                $department->slug = Str::replaceFirst($oldSlug, $request->slug, $department->slug);
                $department->save();
            }
            $relatedDepartments = $branch->departments;
        }

        $branchItem = new BranchItem($branch);
        $message = \Lang::get('messages.recordـupdated', ['title' => $branch->fullTitle()]);
        $data = ['message' => $message, 'branch' => $branchItem, 'relations update' => $flagRelated];
        return response($data);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Branch::find($item['id']);
        $item->delete();

        return response([
            'message' => 'SOFT-Deleted',
            'item' => $item
        ], 200);
    }
}
