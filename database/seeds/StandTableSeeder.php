<?php

use Illuminate\Database\Seeder;
use App\Stand;

class StandTableSeeder extends Seeder
{
    
    public function run()
    {
       $faker = Faker\Factory::create();

       foreach(range (1,10) as $i){
           Stand::create([
               'stand_name' => $faker->name,
               'description' => $faker->name,
               'user_id' => $faker->numberBetween(2,10)
           ]);
       }
    }
}
