<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->name(),
            'email'=>$this->faker->email(),
            'token'=>'token',
            'icon_url'=>'icon_url',
            'start_date'=>$this->faker->date('2024-07-14')
        ];
    }
}
