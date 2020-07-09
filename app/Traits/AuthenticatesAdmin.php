<?php

namespace App\Traits;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

trait AuthenticatesAdmin
{
    use AuthenticatesUsers;

    public function showLoginForm()
    {
        return view('admin.login');
    }

    public function username()
    {
        return 'username';
    }

    protected function guard()
    {
        return Auth::guard('admin');
    }
    protected function sendFailedLoginResponse(Request $request)
    {
        return response()->json(['response' => 'failed', 'message' => Lang::get('auth.failed')], 404);
        // return false;
    }
}
