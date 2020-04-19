<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Blade::component('site-menu', sitemenu::class);   
        Blade::component('sticky-title-menu', stickyTitleMenu::class);   
        Blade::component('fixed-title-ribbon', fixedTitleRibbon::class);   
        Blade::component('sitefooter', sitefooter::class);   

        Blade::component('section', section::class);   
        Blade::component('section-item', sectionitem::class);   
        Blade::component('contact-card', contactCard::class);   
        Blade::component('contact-item', contactItem::class);   
     }
}
