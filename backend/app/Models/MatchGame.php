<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MatchGame extends Model
{
    use SoftDeletes;

    protected $table = 'matches';

    protected $fillable = [
        'event_id',
        'sports_type_id',
        'team_a_id',
        'team_b_id',
        'team_a_score',
        'team_b_score',
        'match_date',
        'location',
        'status',
        'notes',
    ];

    protected $casts = [
        'match_date' => 'datetime',
        'team_a_score' => 'integer',
        'team_b_score' => 'integer',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function sportsType(): BelongsTo
    {
        return $this->belongsTo(SportsType::class);
    }

    public function teamA(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team_a_id');
    }

    public function teamB(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team_b_id');
    }
}
