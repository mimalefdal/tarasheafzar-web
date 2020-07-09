<?php

namespace App\Http\Controllers\AuthStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use Illuminate\Support\Facades\URL;


class StaffLoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */


    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest:staff')->except('staffLogout');
    }


    public function showLoginForm()
    {
        return view('staff.login');
    }

    public function staffLogin(Request $request)
    {
        // sleep(2);
        switch ($request->get('state')) {
            case '0':

                $validatedRequest = $request->validate(['personnel_id' => 'required']);

                $pid = $request->get('personnel_id');
                $user = Staff::where('personnel_id', $pid)->firstOrFail();

                return $user;
                break;
            case '1':

                $validatedRequest = $request->validate(['password' => 'required']);

                $personnel_id = $request->get('personnel_id');
                $password = $request->get('password');
                if (Auth::guard('staff')->attempt(['personnel_id' => $personnel_id, 'password' => $password])) {
                    // redirect(RouteServiceProvider::HOME);
                    return response()->json([
                        'redirect_to' => URL::route('staff.home'),
                        'intended' => URL::previous(),
                    ]);
                }
                return response()->json([
                    'message' => 'wrongPassword'
                ], 401);
                break;
        }
        return $request;
    }

    public function staffLogout(Request $request)
    {
        // dump($request->all());

        Auth::guard('staff')->logout();
        return redirect()->route('staff.index');
    }
}
