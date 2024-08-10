import React from "react";
import feSubjects from "../../../exam/FeSubjectData";
import apSubjects from "../../../exam/ApSubjectData";
import { v4 as uuid } from "uuid";
import { AP, FE, SC } from "../../../exam/Consts";

const LogDetail = ({result}) => {
  const setQuestionNum = (exam_category, question_num) => {
    switch (exam_category) {
      case FE:
        return feSubjects[question_num];
      case AP:
        return apSubjects[question_num];
      case SC:
        return `午後${Math.floor(question_num / 4) + 1}問${
          (question_num % 4) + 1
        }`;
    }
  };
  return (
    <div key={result.id} style={{ margin: "20px 0" }}>
      <div>{result.exam_category}</div>
      <div>{result.exam_num}</div>
      <div>{setQuestionNum(result.exam_category, result.question_num)}</div>
      <div>{result.score}</div>
    </div>
  );
};

export default LogDetail;
