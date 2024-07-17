<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    public function results(){
        return $this->hasMany(Result::class);
    }

    public function delete(){
        $this->results()->delete();
        return parent::delete();
    }
}
