<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Position;

class Joblevel extends Model
{
    protected $fillable = [
        'title', 'slug','scope','priority'
    ];

    public function positions()
    {
        return $this->hasMany(Position::class);
    }

}
