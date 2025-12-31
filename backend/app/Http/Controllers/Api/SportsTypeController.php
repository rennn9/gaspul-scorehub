<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SportsType;
use Illuminate\Http\Request;

class SportsTypeController extends Controller
{
    public function index()
    {
        $sportsTypes = SportsType::orderBy('name')->get();

        return response()->json($sportsTypes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $sportsType = SportsType::create($request->all());

        return response()->json($sportsType, 201);
    }

    public function show(SportsType $sportsType)
    {
        return response()->json($sportsType);
    }

    public function update(Request $request, SportsType $sportsType)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'icon' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $sportsType->update($request->all());

        return response()->json($sportsType);
    }

    public function destroy(SportsType $sportsType)
    {
        $sportsType->delete();

        return response()->json(['message' => 'Sports type deleted successfully']);
    }
}
