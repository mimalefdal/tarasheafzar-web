<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'state'
    ];

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'features_tools');
    }

    public function setFeature($featureSlug)
    {
        $feature = Feature::where('slug', $featureSlug)->get();
        $this->features()->saveMany($feature);
        return $this;
    }
}
