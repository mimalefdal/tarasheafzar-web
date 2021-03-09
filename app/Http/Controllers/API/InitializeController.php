<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Staff;
use App\Traits\ControlsInitialize;

use Illuminate\Support\Facades\Lang;

class InitializeController extends Controller
{

    use ControlsInitialize;

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function status(Request $request)
    {
        $path = base_path() . '/public/data/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);

        $targetFunction = $request->get('targetFunction');

        if ($targetFunction != null) {
            $message = "";

            switch ($targetFunction) {
                case 'defineCeo':
                    if ($this->currentCeo() != null) {
                        $status = true;
                        $message = Lang::get('messages.ceoalreadydefined');
                    } else {
                        $status = false;
                    }
                    break;

                default:
                    # code...
                    break;
            }
            return response()->json(['requestedStatus' => $status, 'message' => $message], 200);
        }
        return response()->json($systemInitialize, 200);
    }

    public function installLicence(Request $request)
    {
        // TODO : here
        // feature & tools (and maybe individual-rights)
        // file must been fetched from companeo server
        // in curret implementation this step faked by basicXxx.json files

        $data = $this->getSystemInitializeContent()['file'];

        $this->updateInitializeStatus(["installLicence" => true,]);
        $data = $this->getSystemInitializeContent()['file'];
        return response()->json(
            [
                'data' => $data,
                'message' => Lang::get('messages.licenceInstalled'),
                'redirect' => false
            ],
            200
        );
    }

    public function initiateSystem(Request $request)
    {

        // TODO : these information must fetched from companue server via http request
        $path = base_path() . '/public/data/systemInfo.json';
        $systemInfo = file_get_contents($path);
        $systemInfo = json_decode($systemInfo, true);

        try {
            $this->initializeSystemInfo($systemInfo);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th,
                'message' => Lang::get('messages.generalfailure'),
                'request' => $request->all(),
                'redirect' => true
            ], 500);;
        }

        $this->updateInitializeStatus(['initiateSystem' => true,]);

        return response()->json(
            [
                'data' => $this->getSystemInitializeContent()['file'],
                'message' => Lang::get('messages.featuresInstalled'),
                'redirect' => false
            ],
            200
        );
    }

    public function defineceo(Request $request)
    {
        // TODO : this function must implement via sheared trait with staffController to add
        if ($this->currentCeo() != null) {
            // TODO : Send alert/notification to current ceo account and superadmin [Security Reasons]

            $this->updateInitializeStatus(["defineCeo" => true,]);
            return response()->json(
                [
                    'error' => 'ceo Already Defined',
                    'message' => Lang::get('messages.ceoalreadydefined'),
                    'redirect' => true
                ],
                400
            );
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
            $ceo->setPosition($request->get('position'));
            $ceo->save();
            $this->updateInitializeStatus(["defineCeo" => true,]);

            return response()->json(
                ["message" => Lang::get('messages.ceodefinedsuccesfully'), 'redirect' => true],
                200
            );
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th,
                'message' => Lang::get('messages.generalfailure'),
                'request' => $request->all(),
                'redirect' => true
            ], 500);;
        }
    }

    private function currentCeo()
    {
        return Staff::with('Position')->whereHas('position', function ($query) {
            $query->where('slug', 'ceo');
        })->first();
    }
}
