import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./AppNav.css";

function AppNavigation({ isLoaded }) {
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
    switch (selectedNavItem) {
      case "online":
        return <div>Online Friends</div>;
      case "all":
        return <div>All Friends</div>;
      case "add":
        return <div>Add Friend</div>;
      default:
        return null;
    }
  };

  return (
    <div className="discord">
      <div className="friends-bar">
        <div className="friends-h1">
          <i className="poo fa-solid fa-poo"></i>
          <h1>Friends</h1>
        </div>
        <div className="divider"></div>
        <nav className="app-nav">
          <ul className="text-bar">
            <li className="friends-buttons">
              <NavLink
                to="/channels/online"
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
                to="/channels/all"
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
                to="/channels/add"
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={searchMessages}
        />
      </div>

      <div className="content-container">{renderContent()}</div>
    </div>
  );
}

export default AppNavigation;
