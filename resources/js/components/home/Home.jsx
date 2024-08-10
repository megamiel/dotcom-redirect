import React from "react";
import { AP, FE, SC } from "../exam/Consts";
import ScTodayQuestion from "./todayQuestion/ScTodayQuestion";
import "./Home.css";
const Home = ({ user }) => {
  const startDate = new Date(user.start_date);
  const today = new Date();
  // 何日経過しているか
  const diff = Math.floor((today - startDate) / 86400000);
  const category = localStorage.getItem("examCategory");
  const setTodayQuestion = (category) => {
    switch (category) {
      case FE:
        return <div>基本</div>;
      case AP:
        return <div>応用</div>;
      case SC:
        return <ScTodayQuestion diff={diff} />;
    }
  };
  return (
    <div>
      <div className="todayQuestionTitle">本日の学習予定問題</div>
      {setTodayQuestion(category)}
    </div>
  );
};

export default Home;
