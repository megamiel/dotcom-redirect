import React, { useState } from "react";
import "./Profile.css";
import axios from "axios";

const Profile = ({ user }) => {
  const [inputName,setInputName]=useState(user.name);
  const saveHandler=async()=>{
      user.name=inputName;
      const user_data={
        id:user.id,
        name:user.name,
        email:user.email,
        token:user.token,
        icon_url:user.icon_url,
        start_date:user.start_date,
        method:"update",
      }
      console.log(user_data);
      await axios.post(`/api/users/`+user.id,user_data);
  }
  return (
    <>
      <div>
        <label>
          <button hidden onClick={()=>console.log("押されました")}/>
          <img className="profileIcon" src={user.icon_url} />
        </label>
        <span style={{ fontSize: "20px" }}>名前:</span>
        <input
          className="input"
          autoComplete="off"
          defaultValue={user.name}
          onChange={e=>setInputName(e.target.value)}
        />
        <button onClick={saveHandler}>保存</button>
      </div>
      <div>
        あなたの成績
      </div>
    </>
  );
};

export default Profile;
