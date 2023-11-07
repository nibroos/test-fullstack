<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Services\TransactionServices;
use App\Actions\Transactions\TransactionStoreAction;
use App\Http\Requests\TransactionStoreRequest;
use App\Http\Resources\TransactionIndexResource;

class TransactionController extends Controller
{
    public function __construct(
        private TransactionServices $transactionService,
        private Request $request
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactionIndexBuilder = $this->transactionService->indexTransaction($this->request);
        $transactions = getPaginateByBuilder($transactionIndexBuilder);
        if ($transactions->isNotEmpty()) {
            return TransactionIndexResource::collection($transactions);
        } else {
            return response(['message' => 'Transaksi tidak ditemukan', 'data' => []], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionStoreRequest $request, TransactionStoreAction $transactionStoreAction)
    {
        try {
            DB::beginTransaction();
            $transactionStoreAction->execute($request);
            DB::commit();
            return response(['message' => 'Transaksi berhasil dibuat'], 201);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            return response(['message' => $exception->getMessage()], 422);
        }
    }
}
