<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'state'
    ];

    public function tools()
    {
        return $this->belongsToMany(Tool::class, 'features_tools');
    }
}
