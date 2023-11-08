<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Carbon\Carbon;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $startDate = Carbon::create(2023, 8, 1, 0, 0, 0);
        $endDate = Carbon::now();

        for ($i = 0; $i < 200; $i++) {
            Product::create([
                'name' => $faker->word,
                'price' => $faker->numberBetween(1, 100),
                'stock' => $faker->numberBetween(1, 100),
                'description' => $faker->sentence,
                'created_at' => $faker->dateTimeBetween($startDate, $endDate),
            ]);
        }
    }
}
