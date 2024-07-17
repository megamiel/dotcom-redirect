import { TextField } from "@mui/material";
import React, { useState } from "react";
import exams from "../exam/ExamData";
import subjects from "../exam/SubjectData";

const Form = ({ user,setPageMode }) => {
  const [selectedExam, setSelectedExam] = useState("non_select");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestionNum, setSelectedQuestionNum] = useState(-1);
  const [inputedScore, setInputedScore] = useState(null);
  const [scoreInputMessage, setScoreInputMessage] = useState(<></>);
  const [inputedShare, setInputedShare] = useState(null);

  const examSelectedHandler = (option) => {
    setSelectedExam(option.value);
  };

  const subjectSelectedHandler = (input) => {
    setSelectedSubject(input.value);
  };

  const questionNumSelectedHandler = (input) => {
    setSelectedQuestionNum(input.value);
  };

  const scoreInputedeHandler = (input) => {
    if (isNaN(input.value)) {
    } else {
      setScoreInputMessage(<></>);
      setInputedScore(input.value);
    }
  };

  const shareInputedHandler = (input) => {
    setInputedShare(input.value);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const user_id = user.id;
    const exam_num = selectedExam;
    const subject = selectedSubject;
    const question_num =
      subject == "情報処理安全確保支援士試験" ? selectedQuestionNum : -1;
    const score = inputedScore;
    const share = inputedShare == null ? "なし" : inputedShare;

    const isSelectedExamNum = exam_num != "non_select";
    const isSelectedSubject = subject != null;
    const isSelectedQuestionNum =
      subject != "情報処理安全確保支援士試験" || question_num > -1;
    const isScoreNumeric = score != null && score != "" && !isNaN(score)&&score>=0&&score<=100;
    const isInputedShare = share != null;

    if (
      isSelectedExamNum &&
      isSelectedSubject &&
      isSelectedQuestionNum &&
      isScoreNumeric &&
      isInputedShare
    ) {
      const result = {
        user_id,
        exam_num,
        subject,
        question_num,
        score,
        share,
        method: "insert",
      };

      // console.log(result);

      // サーバから返ってきたリザルトデータ
      const ret=await axios.post("/api/results", result);
      user.results.push(ret);

      // 送信完了画面に遷移したほうがよさそう
      setPageMode("form_complete");
    }else{
      // どこがダメかメッセージ表示する
      console.log("入力が正しくありません")
    }
  };

  const setExams = () => {
    return exams.map((exam, i) => (
      <option key={i} value={exam.name}>
        {exam.name}
      </option>
    ));
  };

  const setSubjects = () => {
    return subjects.map((subject, i) => (
      <div key={i}>
        <label>
          <input
            type="radio"
            name="subject"
            value={subject}
            onClick={(e) => subjectSelectedHandler(e.target)}
          />
          {subject}
        </label>
      </div>
    ));
  };

  const setQuestionNums = () => {
    if (
      selectedExam == "non_select" ||
      selectedSubject != "情報処理安全確保支援士試験"
    ) {
      return <></>;
    } else {
      const examData = exams.filter((exam) => exam.name == selectedExam)[0];
      const questionNumElements = [];

      [1, 2].forEach((i) => {
        questionNumElements.push(
          [...Array(examData[`pm${i}Len`])].map((ignore, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="question_num"
                  value={(i - 1) * 4 + index}
                  onChange={(e) => questionNumSelectedHandler(e.target)}
                />
                午後{i}:問{index + 1}
              </label>
            </div>
          ))
        );
      });
      return (
        <div>
          <fieldset>
            <legend>問題番号を選択してください</legend>
            {questionNumElements}
          </fieldset>
        </div>
      );
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input name="user_id" value={user.id} readOnly hidden />
        <div>
          <fieldset>
            <legend>試験回を選択してください</legend>
            <select
              name="exam_num"
              style={{ textAlign: "center" }}
              onChange={(e) => examSelectedHandler(e.target)}
            >
              <option value="non_select">- 選択 -</option>
              {setExams()}
            </select>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>学習科目を選択してください</legend>
            {setSubjects()}
          </fieldset>
        </div>

        {setQuestionNums()}

        <div>
          <fieldset>
            <legend>点数を入力してください</legend>
            <div>{scoreInputMessage}</div>
            <TextField
              autoComplete="off"
              name="score"
              onChange={(e) => scoreInputedeHandler(e.target)}
            />
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend>用語・共有</legend>
            <textarea
              name="share"
              onChange={(e) => shareInputedHandler(e.target)}
            />
          </fieldset>
        </div>

        <input name="method" value="insert" readOnly hidden />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Form;
