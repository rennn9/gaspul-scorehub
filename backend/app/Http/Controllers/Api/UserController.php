<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'admin')->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->username,
            'username' => $request->username,
            'email' => null,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'username' => 'sometimes|required|string|unique:users,username,' . $id,
            'password' => 'sometimes|nullable|string|min:8',
        ]);

        $data = [
            'username' => $request->username ?? $user->username,
            'name' => $request->username ?? $user->username,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Tidak dapat menghapus akun sendiri'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus']);
    }
}
