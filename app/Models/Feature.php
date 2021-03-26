<?php

namespace App\Models;

use App\Traits\ManagesRequiredRights;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{

    use ManagesRequiredRights;

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
