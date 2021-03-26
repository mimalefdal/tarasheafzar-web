<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureItem;
use App\Models\Feature;
use App\Models\Right;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:staff');
    }

    public function showHome()
    {
        $lang = \Lang::getLocale();

        $user = Auth::user();
        if ($user->position != null) {
            $user->title = $user->position->title[$lang];
        } else {
            // $titles = json_decode($user->roles->first()->title);
            $titles = $user->roles->first()->title;
            $user->title = $titles[$lang];
        }

        $rights = $user->allRights();
        $features = Feature::whereIn('state', ['installed', 'built-in'])->with('requiredRights', 'tools.requiredRights', 'tools.operations.requiredRights')->get();

        return view('staff.home')->with(compact('user', 'features', 'rights'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('staff.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function show(Staff $staff)
    {
        //
        // dd(Auth::user()->toArray());
        return view('staff.profile')->with('user', $staff);;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function edit(Staff $staff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Staff $staff)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Staff $staff)
    {
        //
    }
}
