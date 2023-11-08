<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GlobalFunctionServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    require_once base_path() . '/app/Functions/GlobalFunctions.php';
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    //
  }
}
