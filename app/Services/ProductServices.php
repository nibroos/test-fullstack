<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class ProductServices
{
  public function indexProduct(): Builder
  {
    $searchPeriodeStartAt = Carbon::parse(request('search_periode_start_at', now()->startOfDay()->toDateTimeString()));
    $searchPeriodeEndAt = Carbon::parse(request('search_periode_end_at', now()->endOfDay()->toDateTimeString()));

    $query = DB::table(Product::TABLE_NAME)
      ->select('products.*')
      ->when(request('search_global'), function ($query) {
        $query->where(function ($q) {
          $q->where('products.name', 'like', '%' . request('search_global') . '%')
            ->orWhere('products.price', 'like', '%' . request('search_global') . '%')
            ->orWhere('products.description', 'like', '%' . request('search_global') . '%');
        });
      })
      ->whereRaw('products.created_at BETWEEN ? AND ?', [$searchPeriodeStartAt, $searchPeriodeEndAt])
      ->orderBy('products.id', 'desc');

    return $query;
  }
}
