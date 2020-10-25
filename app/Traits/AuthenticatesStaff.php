<?php

namespace App\Traits;

use App\Models\Staff;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

trait AuthenticatesStaff
{
    use AuthenticatesUsers;

    public function showLoginForm()
    {
        return view('staff.login');
    }

    public function username()
    {
        return 'personnel_id';
    }

    protected function guard()
    {
        return Auth::guard('staff');
    }
    protected function sendFailedLoginResponse(Request $request)
    {
        return response()->json(['response' => 'failed', 'message' => Lang::get('auth.failed')], 404);
        // return false;
    }

    protected function authenticated(Request $request, $user)
    {

        $token = $user->api_token;

        if ($token == null) {
            $token = $user->createToken('staff-access-token', ['send-api-post-requests']);
            $user->api_token = $token->plainTextToken;
            $user->save();
        }

        // return response()->json([
        //     'mode' => 'debug',
        //     '$user' => $user,
        //     '$token' => $token,
        // ]);


        return response()->json([
            'redirect_to' => URL::route('staff.home'),
            'intended' => URL::previous(),
        ]);
    }
}
