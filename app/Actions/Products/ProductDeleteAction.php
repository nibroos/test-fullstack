<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ProductDeleteAction
{
  public function execute(Product $product): bool
  {
    if ($this->checkProductExistOnTransaction($product)) {
      throw new UnprocessableEntityHttpException('Produk tidak dapat dihapus karena sudah digunakan pada transaksi');
    }

    $product = $this->deleteProduct($product);

    return $product;
  }

  private function deleteProduct(Product $product): bool
  {
    return $product->delete();
  }

  private function checkProductExistOnTransaction(Product $product): bool
  {
    return DB::table('transactions')
      ->where('product_id', $product->id)
      ->exists();
  }
}
