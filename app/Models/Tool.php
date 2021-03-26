<?php

namespace App\Models;

use App\Traits\ManagesRequiredRights;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use ManagesRequiredRights;

    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'state'
    ];

    protected $casts = [
        'title' => 'array',
        'activation' => 'boolean'
    ];

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'features_tools');
    }

    public function operations()
    {
        return $this->hasMany(Operation::class);
    }

    public function setFeature($featureSlug)
    {
        $feature = Feature::where('slug', $featureSlug)->get();
        $this->features()->saveMany($feature);
        return $this;
    }
}
