<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    
    public function run()
    {
        $faker = Faker\Factory::create();
            User::create([
               'name' => 'admin',
               'email' => 'admin@mail.com',
               'password' => Hash::make('@Admin123'),
               'is_admin' => true,
        ]);

        foreach(range (1,9) as $i){
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => Hash::make('@Admin123'),
                'is_admin' => false,
            ]);
        }
    }
}
