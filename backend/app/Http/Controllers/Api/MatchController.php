<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MatchGame;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $query = MatchGame::with(['event', 'teamA', 'teamB', 'sportsType']);

        if ($request->has('event_id')) {
            $query->where('event_id', $request->event_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date')) {
            $query->whereDate('match_date', $request->date);
        }

        $matches = $query->orderBy('match_date', 'asc')->get();

        return response()->json($matches);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'sports_type_id' => 'nullable|exists:sports_types,id',
            'team_a_id' => 'required|exists:teams,id',
            'team_b_id' => 'required|exists:teams,id|different:team_a_id',
            'match_date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'status' => 'in:scheduled,ongoing,finished',
        ]);

        $match = MatchGame::create($request->all());
        $match->load(['teamA', 'teamB', 'event', 'sportsType']);

        return response()->json($match, 201);
    }

    public function show(MatchGame $match)
    {
        $match->load(['event', 'teamA', 'teamB', 'sportsType']);

        return response()->json($match);
    }

    public function update(Request $request, MatchGame $match)
    {
        $request->validate([
            'event_id' => 'sometimes|required|exists:events,id',
            'sports_type_id' => 'nullable|exists:sports_types,id',
            'team_a_id' => 'sometimes|required|exists:teams,id',
            'team_b_id' => 'sometimes|required|exists:teams,id|different:team_a_id',
            'team_a_score' => 'nullable|integer|min:0',
            'team_b_score' => 'nullable|integer|min:0',
            'match_date' => 'sometimes|required|date',
            'location' => 'nullable|string|max:255',
            'status' => 'in:scheduled,ongoing,finished',
            'notes' => 'nullable|string',
        ]);

        $match->update($request->all());
        $match->load(['teamA', 'teamB', 'event', 'sportsType']);

        return response()->json($match);
    }

    public function destroy(MatchGame $match)
    {
        $match->delete();

        return response()->json(['message' => 'Match deleted successfully']);
    }

    public function updateScore(Request $request, MatchGame $match)
    {
        $request->validate([
            'team_a_score' => 'required|integer|min:0',
            'team_b_score' => 'required|integer|min:0',
            'status' => 'sometimes|in:ongoing,finished',
        ]);

        $match->update([
            'team_a_score' => $request->team_a_score,
            'team_b_score' => $request->team_b_score,
            'status' => $request->status ?? $match->status,
        ]);

        $match->load(['teamA', 'teamB', 'event']);

        return response()->json($match);
    }
}
