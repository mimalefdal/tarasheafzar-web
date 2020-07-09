<?php

namespace App\Http\Controllers\AuthAdmin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Traits\AuthenticatesAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class AdminLoginController extends Controller
{
    use AuthenticatesAdmin;

    protected $redirectTo = "/";

    public function __construct()
    {
        $this->middleware('guest:admin')->except('adminLogout');
    }

    public function adminLogin(Request $request)
    {
        $this->login($request);
        return response()->json([
            'redirect_to' => URL::route('admin.home'),
            'intended' => URL::previous(),
        ]);
    }

    public function adminLogout(Request $request)
    {
        // dump($request->all());
        Auth::guard('admin')->logout();
        // $this->logout($request);
        return redirect()->route('admin.login');
    }
}
