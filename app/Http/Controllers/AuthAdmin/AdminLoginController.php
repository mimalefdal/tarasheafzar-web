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
        return $this->login($request);
    }

    public function adminLogout(Request $request)
    {
        Auth::guard('admin')->logout();
        return redirect()->route('cms.login');
    }
}
