<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'activation', 'state'
    ];

    protected $casts = [
        'title' => 'array',
        'activation' => 'boolean'
    ];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }

    public function setTool($toolSlug)
    {
        $tool = Tool::where('slug', $toolSlug)->first();
        $this->tool()->associate($tool);
        return $this;
    }
}
