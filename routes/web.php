<?php

use Illuminate\Support\Facades\Route;

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



Route::get('/', function () {
    $companyData = file_get_contents('../storage/data/company.json');
    // dd($companyData);

    $companyData = json_decode($companyData, true);

    // dd($companyData["brands"]["settings"]["status"]);

    return view('welcome')->with('companyData', $companyData);
    
});

Route::get('/cms', function () {
    return view('cms.index');
    
})->name('cms');



Route::get('/devarch', function () {
    return view('devarch');
});

Route::get('/ContactUs', function () {
    return view('contact-us');
})->name('contacts');
