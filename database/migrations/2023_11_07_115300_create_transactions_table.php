<?php

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(Product::TABLE_NAME, function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('price')->default(0);
            $table->integer('stock')->default(0);
            $table->text('description')->nullable();
            $table->timestamp('created_at');
        });

        Schema::create(Transaction::TABLE_NAME, function (Blueprint $table) {
            $table->id();
            $table->integer('quantity')->default(0);
            $table->integer('price')->default(0);
            $table->string('reference_no');
            $table->integer('payment_amount')->default(0);
            $table->foreignId('product_id')->constrained();
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('transactions');
    }
};
