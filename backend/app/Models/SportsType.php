<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SportsType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'icon',
        'description',
    ];

    public function matches(): HasMany
    {
        return $this->hasMany(MatchGame::class);
    }
}
