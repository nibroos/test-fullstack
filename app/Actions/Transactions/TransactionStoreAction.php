<?php

namespace App\Actions\Transactions;

use GuzzleHttp\Client;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\TransactionStoreRequest;

class TransactionStoreAction
{
  public function execute(TransactionStoreRequest $request): array
  {
    $transaction = $this->createTransaction($request);

    return $transaction;
  }

  private function createTransaction(TransactionStoreRequest $request): array
  {
    $product = Product::findOrFail($request->product_id);
    $requestQuantity = $request->quantity;
    $productPrice = $product->price;
    $paymentAmount = $requestQuantity * $productPrice;

    $referenceNo = $this->getReferenceNo($requestQuantity, $productPrice, $paymentAmount);

    Transaction::create([
      'product_id' => $request->product_id,
      'quantity' => $requestQuantity,
      'price' => $productPrice,
      'payment_amount' => $paymentAmount,
      'reference_no' => $referenceNo
    ]);


    return [
      $requestQuantity,
      $productPrice,
      $paymentAmount,
      $referenceNo
    ];
  }

  private function getReferenceNo(int $quantitiy, int $price, int $paymentAmount)
  {
    // CARA 1
    // $response = Http::withHeaders([
    //   'X-Api-Key' => 'DATAUTAMA',
    //   'X-Signature' => 'Hash sha256 (http method:x-api-key)',
    // ])->post('http://tes-skill.datautama.com/test-skill/api/v1/transactions', [
    //   "quantity" => $quantitiy,
    //   "price" => $price,
    //   "payment_amount" => $paymentAmount,
    // ]);

    // $statusCode = $response->status();
    // $data = $response->json();


    // CARA 2
    // $client = new Client();

    // $response = $client->request('POST', 'http://tes-skill.datautama.com/test-skill/api/v1/transactions', [
    //   'headers' => [
    //     'X-Api-Key' => 'DATAUTAMA',
    //     'X-SIGNATURE' => 'Hash sha256 (http method:x-api-key)',
    //   ],
    //   'json' => [
    //     "quantity" => $quantitiy,
    //     "price" => $price,
    //     "payment_amount" => $paymentAmount,
    //   ], // Request payload
    // ]);

    // $statusCode = $response->getStatusCode();
    // $data = json_decode($response->getBody(), true);

    // $referenceNo = $data['data']['reference_no'];

    // CARA 3, karena disini saya tidak bisa mengakses API tersebut, maka saya menggunakan dummy data

    $referenceNo = 'INV20231107122736412';
    return $referenceNo;
  }
}
