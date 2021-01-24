<?php

namespace App\Http\Resources;

use Bilang;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Lang;

class UnitItem extends JsonResource
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

        // $item = parent::toArray($request);
        $item = [];

        $item['id'] = $this->id;
        // $item['branch_id'] = $this->branch_id;

        $type = 'Unit';
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

        //transform may-related hasunit info
        switch ($this->hasunit_type) {
            case null:
            case 'App\Models\Company':
                $item['holder'] = ['title' => resolve('Company')->getShortName()];
                $item['holder_type'] = 'company';
                break;

            case 'App\Models\Branch':
                $item['holder'] = BranchItem::make($this->hasunit);
                $item['holder_type'] = 'branch';
                break;

            case 'App\Models\Department':
                $item['holder'] = DepartmentItem::make($this->hasunit);
                $item['holder_type'] = 'department';
                break;

            default:
                $item['holder'] = $this->hasunit;
                $item['holder_type'] = $this->hasunit_type;
                break;
        }
        // if ($this->hasunit_id != null)
        $item['holder_id'] = $this->hasunit_id;
        if (Arr::has($item['holder'], 'deleted'))
            if ($item['holder']['deleted']) {
                $item['deleted_holder_warning'] = Lang::get('messages.deleted_holder_warning', ['blocktype' => Lang::get('values.Department'), 'holdertype' => Lang::get('values.' . $item['holder_type'])]);
            }
        return $item;
    }
}
