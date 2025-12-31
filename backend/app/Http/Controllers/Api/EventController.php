<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with(['teams', 'matches'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        $event = Event::create($request->all());

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        $event->load(['teams', 'matches.teamA', 'matches.teamB', 'matches.sportsType']);

        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
