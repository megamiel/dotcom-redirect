<?php

namespace App\Http\Requests\User;

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
            'id'=>'integer',
            'name'=>'required|string',
            'email'=>'required|string',
            'token'=>'required|string',
            'icon_url'=>'required|string',
            'start_date'=>'required|string',
            'method'=>'required|string'
        ];
    }
}
