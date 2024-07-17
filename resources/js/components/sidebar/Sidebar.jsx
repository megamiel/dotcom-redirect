import React from "react";
import {SidebarData} from "./SidebarData"
import SidebarIcon from "./SidebarIcon";
import './Sidebar.css'

const Sidebar = ({user,pageMode,setPageMode}) => {
  const pageModeSelectedHandler=(link)=>{
    sessionStorage.setItem("pageMode",link);
    setPageMode(link);
  }
  return (
    <>
      <div className="Sidebar">
        <SidebarIcon user={user} />
        <ul className="SidebarList">
            {SidebarData.map((value,key)=>(
                <li
                    key={key}
                    className={`row${value.link==pageMode?" active":""}`}
                    onClick={()=>{
                        pageModeSelectedHandler(value.link);
                    }}>
                    <div className="icon">
                        {value.icon}
                    </div>
                    <div className="title">
                        {value.title}
                    </div>
                </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
