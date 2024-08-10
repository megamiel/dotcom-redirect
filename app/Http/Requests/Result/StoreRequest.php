<?php

namespace App\Http\Requests\Result;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id'=>'string',
            'user_id'=>'exists:users,id',
            'exam_category'=>'required|string',
            'exam_num'=>'required|string',
            'question_num'=>'required|integer',
            'score'=>'required|numeric',
            'share'=>'required|string',
            'method'=>'required|string'
        ];
    }
}
