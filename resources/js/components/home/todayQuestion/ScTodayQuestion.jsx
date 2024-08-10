import React from "react";
import exams from "../../exam/ScExamData";
import { v4 as uuid } from "uuid";
const ScTodayQuestion = ({ diff }) => {
  const examTokens = [];
  exams.forEach((exam) => {
    [...Array(exam.pm1Len)]
      .map((ignored, i) => i + 1)
      .forEach((i) => {
        examTokens.push({
          element: (
            <div key={uuid()} style={{textAlign:"center"}}>
              {exam.name}<br/>午後<span className="scNumber">Ⅰ</span>問{i}
            </div>
          ),
        });
      });
  });
  return <div>{examTokens[diff].element}</div>;
};

export default ScTodayQuestion;
