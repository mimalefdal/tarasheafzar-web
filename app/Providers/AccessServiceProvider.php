<?php

namespace App\Providers;

use App\Models\Right;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AccessServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        try {
            Right::get()->map(function ($right) {
                Gate::define($right->slug, function ($user) use ($right) {
                    return $user->allowedTo($right);
                });
            });
        } catch (\Exception $e) {
            report($e);
            return false;
        }

        //Blade directives
        Blade::directive('role', function ($role) {
            return "<?php if(auth()->check() && auth()->user()->hasRole({$role})) : ?>";
        });

        Blade::directive('endrole', function () {
            return "<?php endif; ?>";
        });

        Blade::directive('roles', function ($roles) {
            return "<?php if(auth()->check() && auth()->user()->hasAnyOfRoles({$roles})) : ?>";
        });

        Blade::directive('endroles', function () {
            return "<?php endif; ?>";
        });
    }
}
