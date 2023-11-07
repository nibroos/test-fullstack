<?php

namespace App\Actions\Products;

use App\Models\Product;
use App\Http\Requests\ProductUpdateRequest;

class ProductUpdateAction
{
  public function execute(Product $product, ProductUpdateRequest $request): void
  {
    $this->updateProduct($product, $request);
  }

  private function updateProduct(Product $product, ProductUpdateRequest $request): void
  {
    $product->update($request->validated());
  }
}
