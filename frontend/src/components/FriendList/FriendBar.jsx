import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function FriendBar() {
    const navbarItem = (navItem) => {
        setSelectedNavItem(navItem);
      };
    const [selectedNavItem, setSelectedNavItem] = useState("online");
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="friends-bar">
    <div className="general-view-header">
      <div className="friends-h1">
        <i className="fa-solid fa-users"></i>
        <h2 style={{fontSize:"16px", fontWeight:"600"}}>Friends</h2>
      </div>
      <div className="divider"></div>
      <nav className="app-nav">
        <div className="text-bar">
            <button
              className={
                selectedNavItem === "online"
                  ? "active nav-button online-friend"
                  : "nav-button online-friend"
              }
              onClick={() => navbarItem("online")}
            >
              Online
            </button>
            <button
              className={
                selectedNavItem === "all"
                  ? "active nav-button online-friend"
                  : "nav-button online-friend"
              }
              onClick={() => navbarItem("all")}
            >
              All
            </button>
            <button
              className={
                selectedNavItem === "add"
                  ? "active nav-button add-friend"
                  : "nav-button add-friend"
              }
              onClick={() => navbarItem("add")}
            >
              Add Friend
            </button>
        </div>
      </nav>
    </div>
      </div>
  )
}
