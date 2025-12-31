<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $query = Team::with(['event']);

        if ($request->has('event_id')) {
            $query->where('event_id', $request->event_id);
        }

        $teams = $query->orderBy('name')->get();

        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $team = Team::create($request->all());

        return response()->json($team, 201);
    }

    public function show(Team $team)
    {
        $team->load(['event', 'homeMatches', 'awayMatches']);

        return response()->json($team);
    }

    public function update(Request $request, Team $team)
    {
        $request->validate([
            'event_id' => 'sometimes|required|exists:events,id',
            'name' => 'sometimes|required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $team->update($request->all());

        return response()->json($team);
    }

    public function destroy(Team $team)
    {
        $team->delete();

        return response()->json(['message' => 'Team deleted successfully']);
    }
}
