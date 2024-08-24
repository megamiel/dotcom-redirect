import React from "react";
import { AP, FE, SC } from "../exam/Consts";
import ScTodayQuestion from "./todayQuestion/ScTodayQuestion";
import "./Home.css";
const Home = ({ user, setPageMode }) => {
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
        return <ScTodayQuestion diff={diff} setPageMode={setPageMode} />;
    }
  };

  function getClosestEventDate() {
    const today = new Date();
    const currentYear = today.getFullYear();

    function getEventDate(year, month, week, dayOfWeek) {
      const firstDayOfMonth = new Date(year, month, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const offset = (dayOfWeek - firstDayOfWeek + 7) % 7;
      const eventDate = new Date(year, month, 1 + offset + (week - 1) * 7);
      return eventDate;
    }

    const aprilEvent = getEventDate(currentYear, 3, 3, 0); // 4月の第3日曜日
    const octoberEvent = getEventDate(currentYear, 9, 2, 0); // 10月の第2日曜日

    const nextAprilEvent =
      aprilEvent >= today ? aprilEvent : getEventDate(currentYear + 1, 3, 3, 0);
    const nextOctoberEvent =
      octoberEvent >= today
        ? octoberEvent
        : getEventDate(currentYear + 1, 9, 2, 0);

    return nextAprilEvent < nextOctoberEvent
      ? nextAprilEvent
      : nextOctoberEvent;
  }

  function calculateDaysUntilEvent() {
    const today = new Date();
    const closestEventDate = getClosestEventDate();
    const timeDiff = closestEventDate - today;
    const daysUntilEvent = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // ミリ秒から日数へ変換

    return daysUntilEvent;
  }

  const daysUntilEvent = calculateDaysUntilEvent();

  return (
    <div>
      <div style={{textAlign:"center"}}>試験日まであと{daysUntilEvent}日</div>

      <div className="todayQuestionTitle">本日の学習予定問題</div>
      {setTodayQuestion(category)}
    </div>
  );
};

export default Home;
