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
    }
}
