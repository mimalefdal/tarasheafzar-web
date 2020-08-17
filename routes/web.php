<?php

use App\Http\Controllers\StaffController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::cmsRoutes();
Route::panelRoutes();
Route::reactAppVersionRoutes();


Route::domain(env('APP_ENV') == 'local' ? 'localhost' : env('APP_URL'))->group(function () {
    Route::get('/', function () {
        $path = Storage::disk('public')->path('company.json');
        $companyData = file_get_contents($path);
        $companyData = json_decode($companyData, true);

        return view('welcome')->with('companyData', $companyData);
    })->name('welcome');

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/devarch', function () {
        return view('devarch');
    });

    Route::get('/contact', function () {
        return view('contact-us');
    })->name('contacts');

    Route::post('newMessage', 'VisitorMessageController@store')->name('visitorMessage.store');

    Auth::routes();
});
