<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Http\Requests\Auth\LoginRequest as AuthLoginRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'token' => $request->user()->createToken($request->email)->plainTextToken,
                'message' => 'Success',
                'status' => true
            ]);
        }
        return response()->json([
            'message' => 'Unauthorized',
            'status' => false
        ], Response::HTTP_UNAUTHORIZED);
    }
}
