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

Route::get('company', 'API\CompanyController@show');

Route::post('branch/add', 'API\BranchController@create');
Route::post('branch/update', 'API\BranchController@update');
Route::post('branch/remove', 'API\BranchController@delete');
Route::get('branches', 'API\BranchController@index');
Route::get('branch', 'API\BranchController@show');

Route::post('department/add', 'API\DepartmentController@create');
Route::post('department/update', 'API\DepartmentController@update');
Route::post('department/remove', 'API\DepartmentController@delete');
Route::get('departments', 'API\DepartmentController@index');
Route::get('department', 'API\DepartmentController@show');

Route::post('unit/add', 'API\UnitController@create');
Route::post('unit/update', 'API\UnitController@update');
Route::post('unit/remove', 'API\UnitController@delete');
Route::get('units', 'API\UnitController@index');
Route::get('unit', 'API\UnitController@show');

Route::post('joblevel/add', 'API\JoblevelController@create');
Route::post('joblevel/update', 'API\JoblevelController@update');
Route::post('joblevel/remove', 'API\JoblevelController@delete');
Route::get('joblevels', 'API\JoblevelController@index');
Route::get('joblevel', 'API\JoblevelController@show');

Route::post('position/add', 'API\PositionController@create');
Route::post('position/update', 'API\PositionController@update');
Route::post('position/remove', 'API\PositionController@delete');
Route::get('positions/index', 'API\PositionController@index');
Route::get('positions', 'API\PositionController@zone');
Route::get('position', 'API\PositionController@show');

Route::post('staff/add', 'API\StaffController@create');
Route::post('staff/update', 'API\StaffController@update');
Route::post('staff/remove', 'API\StaffController@delete');
Route::post('staff/restore', 'API\StaffController@restore');
Route::post('staff/suspend', 'API\StaffController@toggleSuspend');
Route::get('staff/index', 'API\StaffController@index');
Route::get('staff', 'API\StaffController@zone');
Route::get('anstaff', 'API\StaffController@show');

Route::get('/initialize/status', 'API\InitializeController@status');
Route::post('/initialize/setlicence', 'API\InitializeController@installLicence');
Route::post('/initialize/initiateSystem', 'API\InitializeController@initiateSystem');
Route::post('/initialize/defineceo', 'API\InitializeController@defineceo');

Route::prefix('rights')->group(function () {
    Route::get('/', 'API\RightController@index');
    Route::post('/updateAccessRights', 'API\RightController@updateAccessRights');
    Route::post('/updateManagedbyRights', 'API\RightController@updateManagedbyRights');
    Route::post('/updateOwnedbyRights', 'API\RightController@updateOwnedbyRights');
});

Route::get('features', 'API\FeatureController@index');

Route::get('/valuelist', 'API\ValuelistController@index');
