<?php

namespace App\Models;

use App\Http\Resources\PositionSimpleItem;
use App\Http\Resources\StaffSimpleItem;
use Illuminate\Database\Eloquent\Model;
use App\Models\Position;
use App\Traits\CanManageRights;
use App\Traits\CanOwnRights;
use App\Traits\ChecksUniqueness;
use App\Traits\ManagesRights;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use ChecksUniqueness;
    use SoftDeletes;
    use ManagesRights;
    use CanOwnRights;
    use CanManageRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation'
    ];

    protected $casts = [
        'title' => 'array',
    ];

    public function staff()
    {
        return $this->morphedByMany(Staff::class, 'role_holder');
    }

    public function positions()
    {
        return $this->morphedByMany(Position::class, 'role_holder');
    }

    public function holders()
    {
        return collect(['positions' => PositionSimpleItem::collection($this->positions), 'staff' => StaffSimpleItem::collection($this->staff)]);
    }

    public function managerStaff()
    {
        return $this->morphedByMany(Staff::class, 'role_manager');
    }

    public function managerPositions()
    {
        return $this->morphedByMany(Position::class, 'role_manager');
    }

    public function managers()
    {
        return collect(['positions' => PositionSimpleItem::collection($this->managerPositions), 'staff' => StaffSimpleItem::collection($this->managerStaff)]);
    }

    public function ownerStaff()
    {
        return $this->morphedByMany(Staff::class, 'role_owner');
    }

    public function ownerPositions()
    {
        return $this->morphedByMany(Position::class, 'role_owner');
    }

    public function owners()
    {
        return collect(['positions' => PositionSimpleItem::collection($this->ownerPositions), 'staff' => StaffSimpleItem::collection($this->ownerStaff)]);
    }
}
