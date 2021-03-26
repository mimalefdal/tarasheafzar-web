<?php

namespace App\View\Components;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\Component;

class MenuItems extends Component
{

    public $items;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $path = Storage::disk('public')->path('site.json');
        $path = base_path() . '/public/data/content/site.json';

        $siteData = file_get_contents($path);
        $siteData = json_decode($siteData, true);

        // dump($siteData['menu-items']);
        $items = $siteData['menu-items'];


        $this->items = $items;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.menu-items');
    }
}
