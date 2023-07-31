import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/components/FriendList.css";

function FriendList({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedNavItem, setSelectedNavItem] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");

  const navbarItem = (navItem) => {
    setSelectedNavItem(navItem);
  };

  const searchMessages = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    if (selectedNavItem === "online") {
      return <div className="content-online">Online</div>;
    } else if (selectedNavItem === "all") {
      return <div className="content-all">All Friends</div>;
    } else if (selectedNavItem === "add") {
      return (
        <div className="content-add">
          <div>Add Friend</div>
          <div>You can add friends with their Discord username</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="discord">
      <div className="friends-bar">
        <div className="general-view-header">
        <div className="friends-h1">
          <i className="poo fa-solid fa-poo"></i>
          <h1>Friends</h1>
        </div>
        <div className="divider"></div>
        <nav className="app-nav">
          <ul className="text-bar">
            <li className="friends-buttons">
              <NavLink
                to="/main"
                className={
                  selectedNavItem === "online"
                    ? "active nav-button online-friend"
                    : "nav-button online-friend"
                }
                onClick={() => navbarItem("online")}
              >
                Online
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/main"
                className={
                  selectedNavItem === "all"
                    ? "active nav-button online-friend"
                    : "nav-button online-friend"
                }
                onClick={() => navbarItem("all")}
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/main"
                className={
                  selectedNavItem === "add"
                    ? "active nav-button add-friend"
                    : "nav-button add-friend"
                }
                onClick={() => navbarItem("add")}
              >
                Add Friend
              </NavLink>
            </li>
          </ul>
        </nav>
        </div>
      </div>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={searchMessages}
            style={{ width: "600px", height: "30px", backgroundColor: "#1e2124" }}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>

      <div className="content-container">{renderContent()}</div>
    </div>
  );
}

export default FriendList;
