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

        // $department = parent::toArray($request);
        $department = [];

        $department['id'] = $this->id;
        $department['branch_id'] = $this->branch_id;

        $type = 'Department';
        $department['type'] = \Lang::get('values.' . $type);
        $department['type_en'] = $type;

        $department['full_title'] = $this->fullTitle();
        $department['full_title_en'] = $this->fullTitle('en');
        $department['title_en'] = Bilang::getEnTitle($this->title);
        $department['title'] = Bilang::getLocalTitle($this->title, true);

        $department['deleted'] = $this->trashed();
        $department['slug'] = $this->slug;

        //transform may-related branch info
        if ($this->branch_id != null)
            $department['branch'] = new BranchItem(Branch::withTrashed()->find($this->branch_id));

        return $department;
    }
}
