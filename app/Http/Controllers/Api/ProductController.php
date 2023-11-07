<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\ProductServices;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Actions\Products\ProductStoreAction;
use App\Actions\Products\ProductUpdateAction;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductIndexResource;

class ProductController extends Controller
{
    public function __construct(
        private ProductServices $productService,
        private Request $request
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productBuilder = $this->productService->indexProduct();
        $products = getPaginateByBuilder($productBuilder);
        if ($products->isNotEmpty()) {
            return ProductIndexResource::collection($products);
        } else {
            return response([
                'message' => 'Produk tidak ditemukan', 'data' => []
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request, ProductStoreAction $productStoreAction)
    {
        try {
            DB::beginTransaction();
            $productStoreAction->execute($request);
            DB::commit();
            return response(['message' => 'Produk berhasil dibuat'], 201);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            return response(['message' => $exception->getMessage()], 422);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, Product $product, ProductUpdateAction $productUpdateAction)
    {
        try {
            DB::beginTransaction();
            $productUpdateAction->execute($product, $request);
            DB::commit();
            return response(['message' => 'Data produk berhasil diubah'], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            return response(['message' => $exception->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            DB::beginTransaction();
            $product->delete();
            DB::commit();
            return response(['message' => 'Data produk berhasil dihapus'], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            return response(['message' => $exception->getMessage()], 422);
        }
    }
}
