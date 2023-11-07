<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Actions\Auth\RegisterUserAction;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserAuthResource;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
  public function loginUser(LoginRequest $request)
  {
    $request->authenticate();
    $request->session()->regenerate();
    $user = auth()->user();

    return (new UserAuthResource($user))->additional([
      'token' => $user->createToken('koperasiToken')->plainTextToken,
      'message' => 'Authenticated'
    ], 201);
  }

  public function logoutUser(Request $request)
  {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    auth()->user()->tokens()->delete();
    return response()->json(['message' => "Sukses logout"], 204);
  }

  public function registerUser(RegisterRequest $request, RegisterUserAction $registerUserAction)
  {
    try {
      DB::beginTransaction();
      $user = $registerUserAction->execute($request);
      $request->authenticate();
      $request->session()->regenerate();
      $user = auth()->user();
      DB::commit();
      return (new UserAuthResource($user))->additional([
        'token' => $user->createToken('koperasiToken')->plainTextToken,
        'message' => 'Authenticated'
      ], 201);
    } catch (\Exception $exception) {
      DB::rollBack();
      Log::error($exception->getMessage());
      return response(['message' => $exception->getMessage()], 422);
    }
  }

  public function authUser(Request $request)
  {
    $user = $request->user();
    return UserAuthResource::make($user)->resolve();
  }
}
