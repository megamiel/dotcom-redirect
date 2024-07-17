import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import "./App.css";
import Profile from "./components/profile/Profile";
import Form from "./components/form/Form";
import { useGetUser, useCurrentUser } from "./hooks/User";
import { authData } from "./components/auth/firebase";
import axios from "axios";
import FormComplete from "./components/form/FormComplete";

const App = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const sessionPageMode=sessionStorage.getItem("pageMode");
  const [pageMode, setPageMode] = useState(sessionPageMode==null?"home":sessionPageMode);
  const { isLoading } = useGetUser();
  const user = useCurrentUser();

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
      method:"insert",
    };
    axios.post("/api/users",new_user);
    window.location="/";
    return <></>
  }

  const setPage = () => {
    const pages = {
      home: <Home />,
      profile: <Profile user={user}/>,
      form: <Form user={user} setPageMode={setPageMode}/>,
      form_complete:<FormComplete/>
    };
    return pages[pageMode];
  };

  if (isLoading) {
    return "Loading...";
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
