<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'event_id',
        'name',
        'logo',
        'description',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function homeMatches(): HasMany
    {
        return $this->hasMany(MatchGame::class, 'team_a_id');
    }

    public function awayMatches(): HasMany
    {
        return $this->hasMany(MatchGame::class, 'team_b_id');
    }
}
