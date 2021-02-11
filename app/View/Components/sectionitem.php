<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SectionItem extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */

    public $title;
    public $comment;
    public $targeturl;
    public $description;
    public $btnlabel;
    public $image;

    //  public $data;

    public function __construct($data = [])
    {

        // dump($data) ;
        if (isset($data["name"])) {
            $this->title = $data["name"];
        }
        if (isset($data["comment"])) {
            $this->comment = $data["comment"];
        }
        if (isset($data["url"])) {
            $this->targeturl = $data["url"];
        }
        if (isset($data["description"])) {
            $this->description = $data["description"];
        }
        if (isset($data["btnlabel"])) {
            $this->btnlabel = $data["btnlabel"];
        }
        if (isset($data["image"])) {
            if ($data["image"] == "") {
                $this->image = 'image/square.png';
            } else {
                $this->image = $data["image"];
            }
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.section-item');
    }
}
