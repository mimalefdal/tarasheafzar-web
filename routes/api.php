<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('rights/add', 'API\RightController@create')->name('rights.add');
Route::get('rights', 'API\RightController@index');

Route::get('staff', 'API\StaffController@index');
Route::post('staff/add', 'API\StaffController@create');

Route::get('/initialize/status', 'API\InitializeController@status');
Route::post('/initialize/defineceo', 'API\InitializeController@defineceo');

Route::get('/valuelist', 'API\ValuelistController@index');

