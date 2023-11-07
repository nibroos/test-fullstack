<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class TransactionServices
{
  public function indexTransaction($request): Builder
  {
    $searchPeriodeStartAt = Carbon::parse(request('search_periode_start_at', now()->toDateTimeString()))->startOfDay();
    $searchPeriodeEndAt = Carbon::parse(request('search_periode_end_at', now()->toDateTimeString()))->endOfDay();

    $query = DB::table(Transaction::TABLE_NAME)
      ->join(Product::TABLE_NAME, 'products.id', '=', 'transactions.product_id')
      ->select('transactions.*')
      ->when(request('search_global'), function ($query) {
        $query->where(function ($q) {
          $q->where('transactions.reference_no', 'like', '%' . request('search_global') . '%')
            ->orWhere('transactions.payment_amount', 'like', '%' . request('search_global') . '%')
            ->orWhere('products.name', 'like', '%' . request('search_global') . '%');
        });
      })
      ->whereRaw('transactions.created_at BETWEEN ? AND ?', [$searchPeriodeStartAt, $searchPeriodeEndAt])
      ->orderBy('transactions.id', 'desc');

    return $query;
  }
}
