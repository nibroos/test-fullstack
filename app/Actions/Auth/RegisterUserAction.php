<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Http\Requests\Auth\RegisterRequest;

class RegisterUserAction
{
  public function execute(RegisterRequest $request): User
  {
    $user = $this->createUser($request);

    return $user;
  }

  private function createUser(RegisterRequest $request): User
  {
    return User::create($request->validated());
  }
}
