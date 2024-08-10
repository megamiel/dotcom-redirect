<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Userを取得する
        $users = User::get();

        // 取得したUserを返す
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // PUTメソッドが機能しないため、updateメソッドをstoreメソッド内で分岐し処理するようにする
    public function store(StoreRequest $request)
    {
        $method = $request->get('method');
        switch ($method) {
            case 'insert':
                // insertを使う際の必須パラメータ
                // name
                // email
                // token
                // icon_url
                // start_date
                // method
                $this->insert($request);
                break;
            case 'update':
                // updateを使う際の必須パラメータ
                // id
                // name
                // email
                // icon_url
                // start_date
                // method
                $this->update($request);
        }
    }

    private function insert(StoreRequest $request)
    {
        if (User::where('email', $request->get('email'))->count() > 0) return;

        

        // 新規のUserモデルを作成する
        $user = new User();

        // ユーザ情報をUserモデルに設定する
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->token = $request->get('token');
        $user->icon_url = $request->get('icon_url');
        $user->start_date = date('Y-m-d', strtotime($request->get('start_date')));

        // DBにデータを登録する
        $user->save();
    }

    private function update(StoreRequest $request)
    {
        $id = $request->get('id');
        $user = User::find($id);
        $user->name = $request->get('name');
        $user->icon_url = $request->get('icon_url');
        $user->start_date = $request->get('start_date');
        $user->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    // 引数を渡されながらindexされてる感じ
    // public function show($infoStr)
    // {
    //     $requestInfos = explode(":::::SPLIT_STRING:::::", $infoStr, 2);
    //     $email = $requestInfos[0];
    //     $token = $requestInfos[1];
    //     $user = User::where('email', $email)->first();
    //     if ($user && $user->token == $token) {
    //         return $user;
    //     } else {
    //         return ['name' => ':::::AUTHENTICATION_FAILED_STRING:::::'];
    //     }
    // }

    public function show($email)
    {
        $user = User::with("results")->where('email', $email)->first();
        return $user;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(UpdateRequest $request, $id)
    // {

    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
    }
}
