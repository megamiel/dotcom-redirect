import React, { useState } from "react";
import { NEW_PROFILE } from "../PageModes";
import { getImageUrl, uploadImage } from "../auth/firebase";
import "./UserInfo.css";
import examCategorys from "../exam/ExamCategoryData";
import API_URI from "../../ApiUri";

const UserInfo = ({ user, setPageMode }) => {
  const [displayIcon, setDisplayIcon] = useState(user.icon_url);
  const [selectedStartDate, setSelectedStartDate] = useState(user.start_date);
  const [inputImageElement, setInputImageElement] = useState(null);

  const setLayout = (image) => {
    image.height = image.width;
    setInputImageElement(image);
  };

  window.addEventListener("resize", () => {
    if (inputImageElement == null) return;
    inputImageElement.height = inputImageElement.width;
  });
  const [inputName, setInputName] = useState(user.name);
  const [inputIcon, setInputIcon] = useState(null);
  const profileIconChangeHandler = (uploadImage) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setDisplayIcon(e.target.result);
    };
    reader.readAsDataURL(uploadImage);
    setInputIcon(uploadImage);
  };
  const startDateChangeHandler = (input) => {
    setSelectedStartDate(input.value);
  };
  const saveHandler = async () => {
    user.name = inputName;
    user.start_date = selectedStartDate;
    const user_data = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: user.token,
      icon_url: user.icon_url,
      start_date: selectedStartDate,
      method: "update",
    };

    if (inputIcon != null) {
      uploadImage(user.email, inputIcon, () => {
        getImageUrl(user.email, async (url) => {
          user.icon_url = url;
          user_data.icon_url = url;
          // 保存中...みたいな表示ほしい
          await axios.post(`${API_URI}/users`, user_data);
          setPageMode(NEW_PROFILE);
        });
      });
    } else {
      await axios.post(`${API_URI}/users`, user_data);
      setPageMode(NEW_PROFILE);
    }
  };
  return (
    <div
      style={{
        padding: "10px 0 20px 0",
        margin: "0 0 20px",
        border: "none",
        borderBottom: "gray 1px solid",
      }}
    >
      <div className="profileEditor">
        <label style={{ width: "13%" }} className="noneSelect">
          <input
            hidden
            onChange={(e) => profileIconChangeHandler(e.target.files[0])}
            type="file"
          />
          <img
            className="profileIcon noneSelect"
            src={displayIcon}
            onLoad={(e) => setLayout(e.target)}
          />
        </label>
        <div>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <div
              className="noneSelect saveButton"
              // style={{ textAlign:"right" }}
              onClick={saveHandler}
            >
              保存
            </div>
          </div>

          <div>
            <span
              className="noneSelect"
              style={{
                fontSize: "20px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              名前
            </span>
            <input
              className="input noneSelect"
              maxLength="20"
              autoComplete="off"
              defaultValue={user.name}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div
            className="noneSelect"
            style={{ marginTop: "15px", fontSize: "20px" }}
          >
            <span
              className="noneSelect"
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                fontSize: "20px",
              }}
            >
              開始日
            </span>
            <input
              type="date"
              defaultValue={user.start_date}
              onChange={(e) => startDateChangeHandler(e.target)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
