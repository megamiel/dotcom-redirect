import React from "react";
import { AP, FE, SC } from "../../../exam/Consts";
import exams from "../../../exam/ScExamData";
import ScLoanDetail from "./ScLoanDetail";

const Loan = ({ user, results, examCategory, setPageMode }) => {
  const setLoans = () => {
    const noLoans = user.results.filter(
      (result) => result.exam_category == examCategory
    );
    // user.start_dateから当日までに解いているはずの問題の配列を用意して、がんばれ
    switch (examCategory) {
      case FE: {
        return <>この試験区分では借金機能が実装されていません</>;
      }
      case AP: {
        return <>この試験区分では借金機能が実装されていません</>;
      }
      case SC: {
        const startDate = new Date(user.start_date);
        const today = new Date();
        // 何日経過しているか
        const diff = Math.floor((today - startDate) / 86400000);

        const examTokens = [];
        let count = 0;
        exams.forEach((exam) => {
          [...Array(exam.pm1Len)]
            .map((ignored, i) => ({
              name: exam.name,
              num: i,
              pm1Len: exam.pm1Len,
              link: exam.link,
            }))
            .filter((element) => {
              let bool = false;
              user.results.forEach((result) => {
                if (
                  result.exam_category == examCategory &&
                  result.exam_num == element.name &&
                  result.question_num == element.num
                ) {
                  bool = true;
                }
              });
              count++;
              return !bool && count <= diff;
            })
            .forEach((element) => examTokens.push(element));
        });

        return (
          <>
            <div>{examTokens.length}個の借金が残っています</div>
            <div>
              {examTokens.map((exam, i) => (
                <ScLoanDetail exam={exam} key={i} setPageMode={setPageMode} />
              ))}
            </div>
          </>
        );
      }
    }
  };

  return <div>{setLoans()}</div>;
};

export default Loan;
