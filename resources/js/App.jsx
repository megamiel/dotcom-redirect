import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import "./App.css";
import Profile from "./components/profile/Profile";
import Form from "./components/form/Form";
import { useGetUser, useCurrentUser } from "./hooks/User";
// 使用箇所なしだけど必須
import { authData } from "./components/auth/firebase";
import axios from "axios";
import FormComplete from "./components/form/FormComplete";
import {
  FORM,
  HOME,
  NEW_FORM,
  NEW_HOME,
  NEW_PROFILE,
  PROFILE,
} from "./components/PageModes";
import API_URI from "./ApiUri";

const App = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const sessionPageMode = sessionStorage.getItem("pageMode");
  const [pageMode, setPageMode] = useState(
    sessionPageMode == null ? HOME : sessionPageMode
  );
  const { isLoading } = useGetUser();
  const user = useCurrentUser();

  switch (pageMode) {
    case NEW_HOME:
      setPageMode(HOME);
      break;
    case NEW_PROFILE:
      setPageMode(PROFILE);
      break;
    case NEW_FORM:
      setPageMode(FORM);
      break;
  }

  if (user == "") {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    // ユーザ情報がDBにないため、作って、DBに追加する必要がある
    const new_user = {
      name: authData.displayName,
      email: authData.email,
      token: "ctfdotcom{dotcomredirectprojecttoken}",
      icon_url: authData.photoURL,
      start_date: `${year}-${month}-${day}`,
      method: "insert",
    };
    axios.post(`${API_URI}/users`, new_user);
    // 再読み込み
    window.location = "./";
    return <></>;
  }

  const setPage = () => {
    const pages = {
      home: <Home user={user} setPageMode={setPageMode}/>,
      profile: <Profile user={user} setPageMode={setPageMode} />,
      form: <Form user={user} setPageMode={setPageMode} />,
      form_complete: <FormComplete user={user}/>,
    };
    return pages[pageMode];
  };

  if (isLoading) {
    const sampleUser = {
      name: "　",
      icon_url:
        "https://kotobank.jp/image/dictionary/daijisen/media/104880L.jpg",
    };
    return (
      <Sidebar
        user={sampleUser}
        pageMode={pageMode}
        setPageMode={setPageMode}
      />
    );
  } else {
    return (
      <div className="App">
        <Sidebar user={user} pageMode={pageMode} setPageMode={setPageMode} />
        <div className="main">{setPage()}</div>
      </div>
    );
  }
};

export default App;
