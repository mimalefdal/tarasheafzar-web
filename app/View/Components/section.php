<?php

namespace App\View\Components;

use Illuminate\View\Component;

class section extends Component
{
    public $data;
    var $title;
    var $description;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($data=[])
    {
        // dump($data["title"]);
        if ( isset($data["title"]) ) {
            $this->title = $data["title"];
        } 
        
        if ( isset($data["description"]) ) {
            $this->description = $data["description"];
        } 
        
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.section');
    }
}
