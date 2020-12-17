<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Staff;
use App\Models\Position;
use Illuminate\Support\Facades\Lang;

class InitializeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function status(Request $request)
    {
        $path = base_path().'/public/data/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);

        $targetStatus = $request->get('targetFunction');

        if ($targetStatus != null) {
        $message="";

            switch ($targetStatus) {
                case 'defineCeo':
                    if ($this->currentCeo() != null)
                    {
                        $status = true;
                        $message = Lang::get('messages.ceoalreadydefined');
                    } else
                    {
                        $status = false;
                    }
                    break;

                default:
                    # code...
                    break;
            }
            return response()->json(['requestedStatus'=>$status,'message'=>$message],200);
            // return response()->json(['function'=>$targetStatus,'status'=>$systemInitialize[$targetStatus]] );
        }
        return response()->json($systemInitialize, 200);
    }

    public function defineceo(Request $request)
    {
        if ($this->currentCeo() != null)   {
            // TODO : Send alert/notification to current ceo account and superadmin [Security Reasons]

            $this->updateInitializeStatus(["defineCeo"=>true,]);
            return response()->json(
                [
                    'error'=>'ceo Already Defined',
                    'message'=> Lang::get('messages.ceoalreadydefined')
                ], 400);
        }

        $validatedRequest = $request->validate([
            'gender' => "required",
            'firstname' => "required",
            'lastname' => "required",
            'national_id' => "required|numeric|unique:staff|digits:10",
            'idcert_no' => "required|numeric|unique:staff",
            'position' => "required",
            'email' => "nullable|email|unique:staff",
        ]);
        $validatedRequest["personnel_id"] = $request["idcert_no"];
        $validatedRequest["username"] = 'ceo';
        $validatedRequest["password"] = \Hash::make('changeme');

        try {
            $ceo = Staff::create($validatedRequest);
            $ceo->setPosition('ceo');

            $this->updateInitializeStatus(["defineCeo"=>true,]);
            return response()->json(
            ["message"=> Lang::get('messages.ceodefinedsuccesfully')]
            , 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th,
                'message' => Lang::get('messages.generalfailure'),
                'request' => $request->all()
            ], 500);;
        }


    }

    private function currentCeo()
    {
        return Staff::with('Position')->whereHas('position',function($query){
            $query->where('slug','ceo');
        })->first();
    }

    private function updateInitializeStatus($status)
    {
        $path = base_path().'/public/data/systemInitialize.json';
            $systemInitialize = file_get_contents($path);
            $systemInitialize = json_decode($systemInitialize, true);

            foreach ($status as $key => $value) {
                $systemInitialize[$key] = $value;
            }

            file_put_contents($path,json_encode($systemInitialize));
    }


}
