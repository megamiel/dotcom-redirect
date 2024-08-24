import { TextField } from "@mui/material";
import React, { useState } from "react";
import exams from "../exam/ScExamData";
import apSubjects from "../exam/ApSubjectData";
import feSubjects from "../exam/FeSubjectData";
import examCategorys from "../exam/ExamCategoryData";
import { AP, FE, SC } from "../exam/Consts";
import { FORM_COMPLETE } from "../PageModes";
import API_URI from "../../ApiUri";

const Form = ({ user, setPageMode }) => {
  const currentExamCategory=sessionStorage.getItem("currentExamCategory");
  const currentExamQuestion=sessionStorage.getItem("currentExamQuestion")
  const currentExamName=sessionStorage.getItem("currentExamName");
  const currentExamNum=parseInt(sessionStorage.getItem("currentExamNum"));

  const [selectedExamCategory, setSelectedExamCategory] =
    useState(currentExamCategory==null?"non_select":currentExamCategory);
  const [selectedExam, setSelectedExam] = useState(currentExamName==null?"non_select":currentExamName);
  const [selectedQuestionNum, setSelectedQuestionNum] = useState(currentExamNum==null?-1:currentExamNum);
  const [inputedScore, setInputedScore] = useState(null);
  const [scoreInputMessage, setScoreInputMessage] = useState(<></>);
  const [inputedShare, setInputedShare] = useState(null);

  const examCategorySelectedHandler = (option) => {
    setSelectedExamCategory(option.value);
  };

  const examSelectedHandler = (option) => {
    setSelectedExam(option.value);
  };

  const questionNumSelectedHandler = (input) => {
    setSelectedQuestionNum(input.value);
  };

  const scoreInputedeHandler = (input) => {
    if (isNaN(input.value)) {
      const fraction=input.value.split("/");
      if(fraction.length==2){
        const score=Math.floor(fraction[0]/fraction[1]*1000)/10;
        if(!isNaN(score)&&score!=Infinity){
          setScoreInputMessage(<></>);
          setInputedScore(score)
        }
      }
    } else {
      setScoreInputMessage(<></>);
      setInputedScore(input.value);
    }
  };

  const shareInputedHandler = (input) => {
    setInputedShare(input.value);
  };

  let canSubmit = true;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    canSubmit = false;
    const user_id = user.id;
    const exam_category = selectedExamCategory;
    const exam_num = selectedExam;
    const question_num = selectedQuestionNum;
    const score = inputedScore;
    const share = inputedShare == null ? "なし" : inputedShare;

    const isSelectedExamCategory = exam_category != "non_select";
    const isSelectedExamNum = exam_num != "non_select";
    const isSelectedQuestionNum = question_num > -1;
    const isScoreNumeric =
      score != null &&
      score != "" &&
      !isNaN(score) &&
      score >= 0 &&
      score <= 100;
    const isInputedShare = share != null;

    if (
      isSelectedExamCategory &&
      isSelectedExamNum &&
      isSelectedQuestionNum &&
      isScoreNumeric &&
      isInputedShare
    ) {
      const result = {
        user_id,
        exam_category,
        exam_num,
        question_num,
        score,
        share,
        method: "insert",
      };

      // サーバから返ってきたリザルトデータ
      const ret = await axios.post(`${API_URI}/results`, result);
      user.results.push(ret.data);

      // 送信完了画面に遷移したほうがよさそう
      setPageMode(FORM_COMPLETE);
    } else {
      // どこがダメかメッセージ表示する
      alert("入力が正しくありません")
    }
  };

  const setExamCategorys = () => {
    return examCategorys.map((category, i) => (
      <option key={i}>{category}</option>
    ));
  };

  const setExams = () => {
    return exams.map((exam, i) => (
      <option key={i} value={exam.name}>
        {exam.name}
      </option>
    ));
  };

  const setQuestionNums = () => {
    switch (selectedExamCategory) {
      case FE:
        return feSubjects.map((subject, i) => (
          <div key={i}>
            <label>
              <input
                type="radio"
                name="question_num"
                value={i}
                onClick={(e) => questionNumSelectedHandler(e.target)}
              />
              {subject}
            </label>
          </div>
        ));
      case AP:
        return apSubjects.map((subject, i) => (
          <div key={i}>
            <label>
              <input
                type="radio"
                name="question_num"
                value={i}
                onClick={(e) => questionNumSelectedHandler(e.target)}
              />
              {subject}
            </label>
          </div>
        ));
      case SC:
        if (selectedExam == "non_select") {
          return (
            <label>
              <input type="radio" name="question_num" />
              該当なし
            </label>
          );
        }
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
                    defaultChecked={currentExamQuestion==i&& (index+1)==currentExamNum}
                  />
                  午後<span className="scNumber">{i == 1 ? "Ⅰ" : "Ⅱ"}</span>:問
                  {index + 1}
                </label>
              </div>
            ))
          );
        });
        return questionNumElements;
      default:
        return (
          <label>
            <input type="radio" name="question_num" />
            該当なし
          </label>
        );
    }
  };

  return (
    <div className="noneSelect">
      <form onSubmit={submitHandler}>
        <input name="user_id" value={user.id} readOnly hidden />
        <div>
          <fieldset>
            <legend>試験区分を選択してください</legend>
            <select
              onChange={(e) => examCategorySelectedHandler(e.target)}
              style={{ textAlign: "center" }}
              defaultValue={currentExamCategory}
            >
              <option key={-1} value="non_select">
                - 選択 -
              </option>
              {setExamCategorys()}
            </select>
          </fieldset>

          <fieldset>
            <legend>試験回を選択してください</legend>
            <select
              name="exam_num"
              style={{ textAlign: "center" }}
              onChange={(e) => examSelectedHandler(e.target)}
              defaultValue={currentExamName}
            >
              <option value="non_select">- 選択 -</option>
              {setExams()}
            </select>
          </fieldset>
        </div>

        <fieldset>
          <legend>問題を選択してください</legend>
          {setQuestionNums()}
        </fieldset>

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
