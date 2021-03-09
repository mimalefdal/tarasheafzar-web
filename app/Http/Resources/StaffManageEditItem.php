<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Utility;

class StaffManageEditItem extends JsonResource
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

        $item = [];

        $item['holder_type'] = Utility::getHolderType($this->position->hasposition_type);

        if ($item['holder_type'] != 'company')
            $item['holder'] = BlockItem::make(Utility::getHolder($item['holder_type'], $this->position->hasposition->slug));

        $item['position'] =  PositionSimpleItem::make($this->position);

        $item['id'] = $this->id;
        $item['gender'] = $this->gender;
        $item['firstname'] = $this->firstname;
        $item['lastname'] = $this->lastname;
        $item['national_id'] = $this->national_id;
        $item['idcert_no'] = $this->idcert_no;
        $item['username'] = $this->username;
        $item['email'] = $this->email;
        $item['suspended'] = $this->suspended;

        return $item;
    }
}
