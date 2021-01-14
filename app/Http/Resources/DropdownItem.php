<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DropdownItem extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $title = json_decode($this->title);

        if (json_last_error() === JSON_ERROR_NONE) {
            // Title field contains a valid JSON
            // means Title field is user translateable data
            $lang = \Lang::getLocale();
            try {
                $label = $this->fullTitle();
            } catch (\Throwable $th) {
                //throw $th;
                $label = $title->$lang;
            }
            $item = ['value' => $this->slug, 'label' => $label];
        } else {
            // means Title field is system translateable data
            $item = ['value' => $this->slug, 'label' => \Lang::get('values.' . $this->title)];
        }
        return $item;
    }
}
