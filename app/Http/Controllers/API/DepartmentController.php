<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Resources\DepartmentItem;
use App\Models\Branch;
use App\Models\Department;
use App\Rules\bilangUnique;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DepartmentController extends Controller
{
    public function create(StoreDepartmentRequest $request)
    {
        $newItem = new Department($request->all());
        $newItem->setBranch(Branch::find($request->branch_id));
        // return response([$request->all(), $newItem], 250);

        $newItem->validateUnity();
        //unity check passed

        // $newItem->save();
        $resourceItem = new DepartmentItem($newItem);

        $message = \Lang::get('messages.recordـcreated', ['title' => $newItem->fullTitle()]);
        // $message = \Lang::get('messages.newrecordـcreated', ['attribute' => Value::getLocalValue($type)]);

        $data = ['message' => $message, 'department' => $resourceItem];
        return response()->json($data, 200);

        // return response(["message" => "Not Implemented", $request], 400);
    }

    public function index()
    {
        return DepartmentItem::collection(Department::with('branch')->get());
    }

    public function show(Request $request)
    {
        if ($request->has('slug')) {
            return new DepartmentItem(Department::withTrashed()->where('slug', $request->slug)->first());
        };
        if ($request->has('id')) {
            return new DepartmentItem(Department::withTrashed()->find($request->id));
        }
        return response('Bad Request', 404);
        // return response(["message" => "Not Implemented", $request], 400);
    }

    public function update(StoreDepartmentRequest $request)
    {

        // return $request->all();
        $flagRelated = false; //determine relations update required if become true

        $item = $request->get('item');
        $editedItem = new Department($request->all());
        $editedItem->id = $item['id'];
        $editedItem->branch_id = $request->branch_id;

        $editedItem->validateUnity();
        //unity check passed

        //update record
        $item = Department::find($item['id']);

        if ($item->slug != $request->slug) {
            $flagRelated = true;
            $oldSlug = $item->slug;
        }
        $item->setBranch(Branch::find($request->branch_id));
        // $item->update($request->all());

        //update related records if needed
        if ($flagRelated) {
        }

        $resourceItem = new DepartmentItem($item);
        $message = \Lang::get('messages.recordـupdated', ['title' => $item->fullTitle()]);
        $data = ['message' => $message, 'department' => $resourceItem, 'relations update' => $flagRelated];
        return response($data);

        // return response(["message" => "Not Implemented", $request->all()], 400);
    }

    public function delete(Request $request)
    {
        $item = $request->item;
        $item = Department::find($item['id']);
        // $item->delete();

        $resourceItem = new DepartmentItem($item);
        $message = \Lang::get('messages.recordـdeleted', ['title' => $item->fullTitle()]);
        $data = ['message' => $message, 'department' => $resourceItem];

        return response($data);

        // return response(["message" => "Not Implemented", $request], 400);
    }
}
