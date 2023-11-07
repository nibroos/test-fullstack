<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    const TABLE_NAME = 'transactions';

    protected $fillable = [
        'quantity',
        'price',
        'reference_no',
        'payment_amount',
        'product_id',
    ];

    public $timestamps = false;
}
