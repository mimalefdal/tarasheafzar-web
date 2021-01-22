<?php

namespace App\Http\Resources;

use App\Models\Branch;
use App\Models\Department;
use App\Models\Value;
use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class DepartmentItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        // $item = parent::toArray($request);
        $item = [];

        $item['id'] = $this->id;
        $item['holder_id'] = $this->branch_id;

        $type = 'Department';
        $item['type'] = \Lang::get('values.' . $type);
        $item['type_en'] = $type;

        $item['full_title'] = $this->fullTitle();
        $item['full_title_en'] = $this->fullTitle('en');
        $item['short_title'] = $this->typedTitle();
        $item['short_title_en'] = $this->typedTitle('en');
        $item['title_en'] = Bilang::getEnTitle($this->title);
        $item['title'] = Bilang::getLocalTitle($this->title, true);

        $item['deleted'] = $this->trashed();
        $item['slug'] = $this->slug;

        //transform may-related branch info
        if ($this->branch_id != null)
            $item['holder'] = new BranchItem(Branch::withTrashed()->find($this->branch_id));
        else
            $item['holder'] = ['title' => resolve('Company')->getShortName()];
        return $item;
    }
}
