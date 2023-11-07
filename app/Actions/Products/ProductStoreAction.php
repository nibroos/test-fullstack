<?php

namespace App\Actions\Products;

use App\Models\Product;
use App\Http\Requests\ProductStoreRequest;

class ProductStoreAction
{
  public function execute(ProductStoreRequest $request): Product
  {
    $product = $this->createProduct($request);

    return $product;
  }

  private function createProduct(ProductStoreRequest $request): Product
  {
    return Product::create($request->validated());
  }
}
