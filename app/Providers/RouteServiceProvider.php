<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //


        Route::macro('adminRoutes', function () {
            Route::group(['domain' => 'admin.' . (env('APP_ENV') == 'local' ? 'localhost' : env('APP_URL'))], function () {

                Route::get('/home', 'AdminController@showHome')->name('admin.home');
                Route::get('/', 'AdminController@showHome')->name('admin.home');

                Route::get('/login', 'AuthAdmin\\AdminLoginController@showLoginForm')->name('admin.login');
                Route::post('/login', 'AuthAdmin\\AdminLoginController@adminLogin')->name('admin.login');

                Route::get('/logout', 'AuthAdmin\\AdminloginController@adminLogout')->name('admin.logout');
            });
        });

        Route::macro('staffRoutes', function () {
            Route::group(['domain' => 'staff.' . (env('APP_ENV') == 'local' ? 'localhost' : env('APP_URL'))], function () {
                Route::get('/home', 'StaffController@showHome')->name('staff.home');
                Route::get('/profile', 'StaffController@show')->name('staff.profile');

                Route::get('/', 'StaffController@showHome')->name('staff.index');

                Route::get('/login', 'AuthStaff\\StaffLoginController@showLoginForm')->name('staff.login');
                Route::post('/login', 'AuthStaff\\StaffLoginController@staffLogin')->name('staff.login');
                Route::get('/logout', 'AuthStaff\\StaffLoginController@staffLogout')->name('staff.logout');
            });
        });

        Route::macro('reactAppVersionRoutes', function () {
            Route::group(['domain' => 'app.' . (env('APP_ENV') == 'local' ? 'localhost' : env('APP_URL'))], function () {

                Route::get('/{path?}', function () {
                    $path = Storage::disk('public')->path('company.json');
                    $companyData = file_get_contents($path);
                    $companyData = json_decode($companyData, true);

                    return view('app.app')->with('companyData', $companyData);
                });
                Route::post('newMessage', 'VisitorMessageController@store');
            });
        });

        // Route::macro('adminRoutes', function () {
        //     Route::group(['domain' => 'admin.' . (env('APP_ENV') == 'local' ? 'localhost' : env('APP_URL'))], function () {
        //     });
        // });


        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
