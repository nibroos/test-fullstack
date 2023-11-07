<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    const TABLE_NAME = 'products';

    protected $fillable = [
        'name',
        'price',
        'stock',
        'description',
    ];

    public $timestamps = false;
}
