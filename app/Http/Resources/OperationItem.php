<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;

class OperationItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        $item['id'] = $this->id;
        $item['slug'] = $this->slug;

        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        $item['state'] = $this->state;
        $item['activation'] = $this->activation;

        return $item;
    }
}
