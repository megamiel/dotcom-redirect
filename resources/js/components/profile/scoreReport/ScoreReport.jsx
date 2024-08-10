import React, { useState } from "react";
import apSubjects from "../../exam/ApSubjectData";
import feSubjects from "../../exam/FeSubjectData";
import "./ScoreReport.css";
import Log from "./log/Log";
import examCategorys from "../../exam/ExamCategoryData";
import Grade from "./grade/Grade";
import Loan from "./Loan";
import { AP, FE } from "../../exam/Consts";

const ScoreReport = ({ user }) => {
  const storageExamCategory = localStorage.getItem("examCategory");
  const [examCategory, setExamCategory] = useState(
    storageExamCategory == null ? FE : storageExamCategory
  );
  const [selectedMenu, setSelectedMenu] = useState("成績");

  const examCategorySelectedHandler = (option) => {
    localStorage.setItem("examCategory", option.value);
    setExamCategory(option.value);
  };

  const setMenus = () => {
    const menus = ["成績", "履歴", "借金"];
    return menus.map((menu, i) => {
      return (
        <button
          key={i}
          className={`noneSelect menuButton${
            selectedMenu == menu ? " activeMenu" : ""
          }`}
          style={{ width: `${100 / menus.length}%` }}
          onClick={() => setSelectedMenu(menu)}
        >
          {menu}
        </button>
      );
    });
  };

  const setMenuContent = () => {
    const targetResults = user.results.filter(
      (result) => result.exam_category == examCategory
    );
    switch (selectedMenu) {
      case "成績":
        return <Grade results={targetResults} examCategory={examCategory}/>;
      case "履歴":
        return <Log user={user} results={targetResults} />;
      case "借金":
        return <Loan user={user} results={targetResults} examCategory={examCategory} />;
    }
  };

  return (
    <div>
      <div className="noneSelect" style={{ fontSize: "20px" }}>
        スコアレポート
      </div>
      <div className="noneSelect" style={{ margin: "0 10px 10px" }}>
        <span style={{ marginRight: "5px" }}>試験区分</span>
        <select
          style={{ textAlign: "center" }}
          defaultValue={examCategory}
          onChange={(e) => examCategorySelectedHandler(e.target)}
        >
          {examCategorys.map((category, i) => {
            return (
              <option key={i} className="noneSelect" value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div>{setMenus()}</div>
      {setMenuContent()}
    </div>
  );
};

export default ScoreReport;
