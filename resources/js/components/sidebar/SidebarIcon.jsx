import React, { useState } from "react";

const SidebarIcon = ({ user }) => {
  const [icon, setIcon] = useState(null);
  const setLayout = (image) => {
    image.height = image.width;
    setIcon(image);
  };
  // window.onresize = () => {
  //   icon.height = icon.width;
  // };
  window.addEventListener("resize",()=>{
    if(icon==null)return
    icon.height=icon.width;
  });


  return (
    <div className="SidebarIcon">
      <img
        id="SidebarIconImage"
        onLoad={(event) => setLayout(event.target)}
        src={user.icon_url}
      />
      <p>{user.name}</p>
    </div>
  );
};

export default SidebarIcon;
