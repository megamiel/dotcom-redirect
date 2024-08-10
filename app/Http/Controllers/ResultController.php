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
        $result->exam_category = $request->get('exam_category');
        $result->exam_num = $request->get('exam_num');
        $result->question_num = $request->get('question_num');
        $result->score = $request->get('score');
        $result->share = $request->get('share');
        $result->save();

        $user = User::find($result->user_id);

        $questionsMap = [
            "基本情報技術者試験" => [
                "疑似言語",
                "情報セキュリティ"
            ],
            "応用情報技術者試験" => [
                "情報セキュリティ",
                "経営戦略",
                "プログラミング",
                "システムアーキテクチャ",
                "ネットワーク",
                "データベース",
                "組込みシステム開発",
                "情報システム開発",
                "プロジェクトマネジメント",
                "サービスマネジメント",
                "システム監査",
            ],
            "情報処理安全確保支援士試験"=>[
                "午後1 問1",
                "午後1 問2",
                "午後1 問3",
                "午後1 問4",
                "午後2 問1",
                "午後2 問1",
            ]
        ];

        if($result->exam_category=="情報処理安全確保支援士試験"){
            $notifyExamCategory="セキスぺ";
        }else{
            $notifyExamCategory=$result->exam_category;
        }
        $questions=$questionsMap[$result->exam_category];

        $message = "\n{$user->name}の学習結果\n・区分：{$notifyExamCategory}\n・回次：{$result->exam_num}\n・問題：{$questions[$result->question_num]}\n・点数：{$result->score}%\n・用語・共有\n{$result->share}";
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
        $result->exam_category = $request->get('exam_category');
        $result->exam_num = $request->get('exam_num');
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
