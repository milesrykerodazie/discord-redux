import React, { useState, useEffect } from "react";
import "../Css/Sidebar.css";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "desc")
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
    console.log(channels);
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>{user.displayName}</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__header">
          <ExpandMoreIcon />
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
      </div>

      <div className="sidebar__chats">
        {channels.map(({ id, data: { channelName } }) => (
          <SidebarChannel key={id} id={id} channelName={channelName} />
        ))}
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
      <p onClick={() => auth.signOut()} className="sidebar__logout">
        LogOut
      </p>
    </div>
  );
}

export default Sidebar;
