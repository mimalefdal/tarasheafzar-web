<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Resources\DepartmentItem;
use App\Models\Branch;
use App\Models\Department;
use App\Models\Value;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DepartmentController extends Controller
{
    public function create(StoreDepartmentRequest $request)
    {
        $newDepartment = $this->makeNewDepartmentFromRequest($request);
        $newDepartment->setBranch(Branch::find($request->branch_id));
        // return response([$request->all(), $newDepartment], 250);

        $this->checkForUnity($newDepartment);
        // return $newDepartment;

        $newDepartment->save();
        $departmentItem = new DepartmentItem($newDepartment);

        $message = \Lang::get('messages.recordـcreated', ['record' => $newDepartment->fullTitle()]);
        // $message = \Lang::get('messages.newrecordـcreated', ['attribute' => Value::getLocalValue($type)]);

        $data = ['message' => $message, 'department' => $departmentItem];
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

    public function update(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }

    public function delete(Request $request)
    {
        return response(["message" => "Not Implemented", $request], 400);
    }

    private function checkForUnity(Department $department)
    {
        $isUnique = $department->isUnique();

        if (!$isUnique->check) {
            throw ValidationException::withMessages($isUnique->errors);
        }
    }

    private function makeNewDepartmentFromRequest($request)
    {
        return new Department($request->all());
    }
}
