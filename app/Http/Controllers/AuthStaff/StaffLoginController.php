<?php

namespace App\Http\Controllers\AuthStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Models\Staff;
use App\Traits\AuthenticatesStaff;
use Illuminate\Support\Facades\Lang;
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

    use AuthenticatesStaff;

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
        $this->middleware('guest:staff')->except(['staffLogout', 'getToken']);
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
                $user = Staff::where('personnel_id', $pid)->first();

                if ($user)
                    return $user;
                else {
                    return response()->json(['response' => 'failed', 'message' => Lang::get('auth.wrongPersonnelId')], 404);
                }

                break;
            case '1':
                $validatedRequest = $request->validate(['password' => 'required']);
                return $this->login($request);
                break;
        }
        return $request;
    }


    public function staffLogout(Request $request)
    {
        $user = Auth::guard('staff')->user();
        $request->session()->flush();
        Auth::guard('staff')->logout();
        return redirect()->route('staff.login');
    }
}
