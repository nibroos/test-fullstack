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
    $orderColumn = request('order_column', 'transactions.id');
    if (!in_array($orderColumn, ['transactions.id', 'transactions.created_at', 'products.name', 'product_price', 'transactions.quantity', 'payment_amount'])) {
      $orderColumn = 'transactions.id';
    }
    $orderDirection = request('order_direction', 'desc');
    if (!in_array($orderDirection, ['asc', 'desc'])) {
      $orderDirection = 'desc';
    }

    $searchPeriodeStartAt = Carbon::parse(request('search_periode_start_at', now()->toDateTimeString()))->startOfDay();
    $searchPeriodeEndAt = Carbon::parse(request('search_periode_end_at', now()->toDateTimeString()))->endOfDay();

    $query = DB::table(Transaction::TABLE_NAME)
      ->join(Product::TABLE_NAME, 'products.id', '=', 'transactions.product_id')
      ->selectRaw('
        transactions.id as id,
        transactions.reference_no as reference_no,
        products.name as product_name,
        products.price as product_price,
        transactions.quantity as quantity,
        transactions.payment_amount as payment_amount,
        transactions.created_at as created_at
      ')
      ->when(request('search_global'), function ($query) {
        $query->where(function ($q) {
          $q->where('transactions.reference_no', 'like', '%' . request('search_global') . '%')
            ->orWhere('transactions.payment_amount', 'like', '%' . request('search_global') . '%')
            ->orWhere('products.name', 'like', '%' . request('search_global') . '%');
        });
      })
      ->whereRaw('transactions.created_at BETWEEN ? AND ?', [$searchPeriodeStartAt, $searchPeriodeEndAt])
      ->orderBy($orderColumn, $orderDirection);

    return $query;
  }
}
