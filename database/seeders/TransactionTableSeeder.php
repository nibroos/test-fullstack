<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Product;
use Carbon\Carbon;

class TransactionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 200; $i++) {
            $product = Product::inRandomOrder()->first();
            $quantity = $faker->numberBetween(1, 10);
            $price = $product->price;
            $referenceNo = 'INV' . $faker->numberBetween(20231007122736412, 20231108122736412);
            $paymentAmount = $quantity * $price;

            Transaction::create([
                'quantity' => $quantity,
                'price' => $price,
                'reference_no' => $referenceNo,
                'payment_amount' => $paymentAmount,
                'product_id' => $product->id,
            ]);
        }
    }
}
