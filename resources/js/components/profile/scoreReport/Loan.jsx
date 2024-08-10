import React from "react";
import { AP, FE, SC } from "../../exam/Consts";

const Loan = ({ user, results, examCategory }) => {
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
        const startDate=new Date(user.start_date);
        const today=new Date();
        // 何日経過しているか
        const diff=Math.floor((today-startDate)/86400000);
        
      }
    }
  };

  return <div>{setLoans()}</div>;
};

export default Loan;
