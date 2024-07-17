<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'exam_num'=>"平成23年春期",
            'subject'=>"セキスぺ",
            'question_num'=>2,
            'score'=>60.5,
            'share'=>"むずかしかった"
        ];
    }
}
