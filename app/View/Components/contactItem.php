<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ContactItem extends Component
{

    public $icon;
    public $mainData;
    public $comment;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($mainData,$comment="",$icon="")
    {
        //
        $this->icon = $icon;
        $this->comment = $comment;
        $this->mainData = $mainData;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.contact-item');
    }
}
