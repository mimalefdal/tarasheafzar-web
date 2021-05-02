<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffSimpleItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $item = [];

        $item['id'] = $this->id;

        $item['personnel_id'] = $this->personnel_id;
        $item['idcert_no'] = $this->idcert_no;
        $item['national_id'] = $this->national_id;
        $item['firstname'] = $this->firstname;
        $item['lastname'] = $this->lastname;
        $item['fullname'] = $this->getFullNameAttribute();
        $item['position'] = PositionSimpleItem::make($this->position);
        $item['suspended'] = $this->suspended;
        $item['deleted'] = $this->trashed();

        $item['liststitle'] = $item['fullname'];

        return $item;
    }
}
