<?php

namespace Database\Seeders;

use App\Models\Result;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user=User::factory()->create();
        Result::factory(5)->create([
            'user_id'=>$user->id
        ]);
    }
}
