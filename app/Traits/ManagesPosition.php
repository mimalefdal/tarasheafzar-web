<?php

namespace App\Traits;

use App\Models\Position;

trait ManagesPosition
{
public function setPosition($position)
    {
        $position = Position::where('slug',$position)->first();
        return $this->position()->associate($position)->save();
    }

    public function removePosition($position)
    {
        $position = Position::where('slug',$position)->first();
        return $this->position()->detach($position)->save();
    }

    public function refreshPosition($position)
    {
       $this->position()->detach();
       return $this->setPosition($position);
    }

    public function position() {
        return $this->belongsTo(Position::class);
    }
}
