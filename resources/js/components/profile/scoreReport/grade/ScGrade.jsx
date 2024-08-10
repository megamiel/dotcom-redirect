import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./scGrade.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        font: {
          family: "クラフト明朝", // フォントファミリー
          size: 14, // フォントサイズ
        },
      },
    },
    x: {
      ticks: {
        font: {
          family: "クラフト明朝",
        },
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: "クラフト明朝", // フォントファミリー
          size: 14, // フォントサイズ
        },
      },
    },
  },
};

const ScGrade = ({ results }) => {
  const sc1Results = results.filter((result) => result.question_num < 4);
  const sc1Labels = sc1Results.map((ignore, i) => i + 1);
  const sc1Datas = sc1Results.map((result) => result.score);
  const sc1DataMap = {
    labels: sc1Labels,
    datasets: [
      {
        label: "点数",
        data: sc1Datas,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const sc2Results = results.filter((result) => result.question_num > 3);
  const sc2Labels = sc2Results.map((ignored, i) => i);
  const sc2Datas = sc2Results.map((result) => result.score);
  const sc2DataMap = {
    labels: sc2Labels,
    datasets: [
      {
        label: "点数",
        data: sc2Datas,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  const setQuestionNumResult = (num, results, dataMap) => {
    const average =results.length==0?0:
      Math.floor(
        (results
          .map((result) => result.score)
          .reduce((sum, score) => sum + score) /
          results.length) *
          10
      ) / 10;
    const max = results.length==0?0: results
      .map((result) => result.score)
      .reduce((max, score) => (max > score ? max : score));
    const min = results.length==0?0: results
      .map((result) => result.score)
      .reduce((min, score) => (min < score ? min : score));
    const evaluation =results.length==0?0:
      Math.floor(
        results
          .map((result) => result.score)
          .reduce((evaluation, score) => evaluation * 0.7 + score * 0.3) * 10
      ) / 10;
    // S:90以上
    // A:80以上
    // B:70以上
    // C:60以上
    // D:50以上
    // E:40以上
    // F:30以上
    // null:30未満
    const markMap = [
      { score: 90, mark: "S" },
      { score: 80, mark: "A" },
      { score: 70, mark: "B" },
      { score: 60, mark: "C" },
      { score: 50, mark: "D" },
      { score: 40, mark: "E" },
      { score: 30, mark: "F" },
    ];
    let judgment = "null";
    for (let i = 0; i < markMap.length; i++) {
      if (evaluation >= markMap[i].score) {
        judgment = markMap[i].mark;
        break;
      }
    }

    return (
      <div style={{ width: "70%", margin: "auto" }}>
        <div className="questionNum">
          午後
          <span className="scNumberOnly">
            {num == 1 ? "Ⅰ" : "Ⅱ"}
          </span>
          問題
        </div>
        <div className="container">
          <div className="item">試験回数:{results.length}回</div>
          <div className="item">平均点　:{average}</div>
          <div className="item">最高点　:{max}</div>
          <div className="item">最低点　:{min}</div>
          <div className="item">総合評価:{evaluation}</div>
          <div className="item">合格判定:{judgment}</div>
        </div>
        <Line options={options} data={dataMap} />
      </div>
    );
  };

  return (
    <>
      {setQuestionNumResult(1, sc1Results, sc1DataMap)}
      {setQuestionNumResult(2, sc2Results, sc2DataMap)}
    </>
  );
};

export default ScGrade;
