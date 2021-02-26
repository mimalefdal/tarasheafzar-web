<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'title', 'slug', 'activation', 'state', 'description'
    ];

    protected $casts = [
        'title' => 'array',
        'activation' => 'boolean'
    ];

    public function tools()
    {
        return $this->belongsToMany(Tool::class, 'features_tools');
    }
}
