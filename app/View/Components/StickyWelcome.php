<?php

namespace App\View\Components;

use Illuminate\View\Component;

class StickyWelcome extends Component
{
    public $info;

    /**
     * Create a new component instance.
     *
     * @return void
     */


    public function __construct($data)
    {
        //
        // dd($data);
        $this->info = $data;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.sticky-welcome');
    }
}
