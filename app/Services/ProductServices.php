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
    $orderColumn = request('order_column', 'products.id');
    if (!in_array($orderColumn, ['products.id', 'products.created_at', 'products.name', 'products.price', 'products.stock'])) {
      $orderColumn = 'products.id';
    }
    $orderDirection = request('order_direction', 'desc');
    if (!in_array($orderDirection, ['asc', 'desc'])) {
      $orderDirection = 'desc';
    }

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
      ->orderBy($orderColumn, $orderDirection);

    return $query;
  }

  public function productOptions()
  {
    $products = DB::table(Product::TABLE_NAME)
      ->select('id', 'name', 'price', 'stock')
      ->when(request('search_name'), function ($query) {
        $query->where(function ($q) {
          $q->where('name', 'like', '%' . request('search_name') . '%');
        });
      })
      ->limit(50);

    return $products;
  }
}
