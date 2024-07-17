<?php

namespace App\Http\Controllers;

use App\Http\Requests\Result\StoreRequest;
use App\Http\Requests\Result\UpdateRequest;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "返信です";
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
    public function store(StoreRequest $request)
    {
        $method = $request->get('method');
        switch ($method) {
            case 'insert':
                return $this->insert($request);
            case 'update':
                return $this->update($request);
        }
    }

    private function insert(StoreRequest $request)
    {
        // 既に存在するデータの場合、ラインで通知した後に既に存在するデータですって通知して、データベースには保存しない


        $result = new Result();
        $result->user_id = $request->get('user_id');
        $result->exam_num = $request->get('exam_num');
        $result->subject = $request->get('subject');
        $result->question_num = $request->get('question_num');
        $result->score = $request->get('score');
        $result->share = $request->get('share');
        $result->save();

        $user = User::find($result->user_id);


        if ($result->subject == "情報処理安全確保支援士試験") {
            $subject="セキスぺ";
        }else{
            $subject=$result->subject;
        }

        $questionNumMessage = "";
        if ($subject == "セキスぺ") {
            $pm = floor($result->question_num / 4 + 1);
            $qn = $result->question_num % 4 + 1;
            $questionNumMessage = "\n・問題：午後{$pm}問{$qn}";
        }
        $message = "\n{$user->name}の学習結果\n・試験：{$result->exam_num}\n・科目：{$subject}{$questionNumMessage}\n・点数：{$result->score}%\n・用語・共有\n{$result->share}";
        $this->lineNotify($message);

        return $result;
    }

    // line notify token
    // LblNZeaR7YJr17AbUnkQuMMtmiL292HCPGHwNpP9JN4

    private function lineNotify($message)
    {
        $LINE_NOTIFY_TOKEN = "LblNZeaR7YJr17AbUnkQuMMtmiL292HCPGHwNpP9JN4";
        $url = "https://notify-api.line.me/api/notify";
        $ch  = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $LINE_NOTIFY_TOKEN));
        $post_data = array('message' => $message);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
        $res = curl_exec($ch);
        curl_close($ch);
    }

    private function update(StoreRequest $request)
    {
        $id = $request->get('id');
        $result = Result::find($id);
        $result->exam_num = $request->get('exam_num');
        $result->subject = $request->get('subject');
        $result->question_num = $request->get('question_num');
        $result->score = $request->get('score');
        $result->share = $request->get('share');
        $result->save();

        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return "test";
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

    // PUTメソッドは実行できないので、POSTメソッド(store)で実行するようにする
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
        $result = Result::find($id);
        $result->delete();
    }
}
