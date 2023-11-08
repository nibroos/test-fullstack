<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::post('/auth/register', [AuthController::class, 'registerUser']);

Route::group(
    ['middleware' => 'auth:sanctum'],
    function () {
        Route::apiResources([
            'products' => ProductController::class,
            'transactions' => TransactionController::class,
        ]);
        Route::get('/product/select', [ProductController::class, 'selectProduct']);
        Route::post('/auth/logout', [AuthController::class, 'logoutUser']);
        Route::get('/auth/user', [AuthController::class, 'authUser']);
    }
);
