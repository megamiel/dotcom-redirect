import React from "react";
import exams from "../../exam/ScExamData";
import { v4 as uuid } from "uuid";
import { SC } from "../../exam/Consts";
import SIKEN_DOTCOM_LINK from "../../../SikenDotcomLink";
import { FORM } from "../../PageModes";
const ScTodayQuestion = ({ diff, setPageMode }) => {
  const examClickHandle = (exam, i) => {
    sessionStorage.setItem("currentExamCategory", SC);
    sessionStorage.setItem("currentExamName", exam.name);
    sessionStorage.setItem("currentExamQuestion", 1);
    sessionStorage.setItem("currentExamNum", i);
    setPageMode(FORM);
  };

  const examTokens = [];
  exams.forEach((exam) => {
    [...Array(exam.pm1Len)]
      .map((ignored, i) => i + 1)
      .forEach((i) => {
        examTokens.push({
          element: (
            <div key={uuid()} style={{ textAlign: "center" }}>
              <a
                className="redirect"
                href={`${SIKEN_DOTCOM_LINK}${exam.link}`}
                target="_blank"
                onClick={(e) => examClickHandle(exam, i)}
              >
                {SC}
                <br />
                {exam.name}
                <br />
                午後<span className="scNumber">Ⅰ</span>問{i}
              </a>
            </div>
          ),
        });
      });
  });

  return <div>{examTokens[diff].element}</div>
};

export default ScTodayQuestion;
