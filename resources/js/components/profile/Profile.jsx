import React, { useState } from "react";
import "./Profile.css";
import ScoreReport from "./scoreReport/ScoreReport";
import UserInfo from "./UserInfo";

const Profile = ({ user, setPageMode }) => {
  return (
    <>
      <UserInfo
        user={user}
        setPageMode={setPageMode}
      />
      <ScoreReport user={user} setPageMode={setPageMode}/>
    </>
  );
};

export default Profile;
