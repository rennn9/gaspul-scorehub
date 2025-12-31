<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\SportsTypeController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

Route::get('/teams', [TeamController::class, 'index']);
Route::get('/teams/{team}', [TeamController::class, 'show']);

Route::get('/matches', [MatchController::class, 'index']);
Route::get('/matches/{match}', [MatchController::class, 'show']);

Route::get('/sports-types', [SportsTypeController::class, 'index']);
Route::get('/sports-types/{sportsType}', [SportsTypeController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);

    Route::post('/teams', [TeamController::class, 'store']);
    Route::put('/teams/{team}', [TeamController::class, 'update']);
    Route::delete('/teams/{team}', [TeamController::class, 'destroy']);

    Route::post('/matches', [MatchController::class, 'store']);
    Route::put('/matches/{match}', [MatchController::class, 'update']);
    Route::delete('/matches/{match}', [MatchController::class, 'destroy']);
    Route::patch('/matches/{match}/score', [MatchController::class, 'updateScore']);

    Route::post('/sports-types', [SportsTypeController::class, 'store']);
    Route::put('/sports-types/{sportsType}', [SportsTypeController::class, 'update']);
    Route::delete('/sports-types/{sportsType}', [SportsTypeController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
