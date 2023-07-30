import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./AppNavBar.css"

function AppNavigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [selectedNavItem, setSelectedNavItem] = useState("home")
    const [searchQuery, setSearchQuery] = useState("");

    const navbarItem = (navItem) => {
        setSelectedNavItem(navItem);
    }

    const searchMessages = (event) => {
        setSearchQuery(event.target.value);
    }

    const renderContent = () => {
        switch (selectedNavItem) {
          case "online":
            return <div>Online Friends</div>;
            case "all":
            return <div>All Friends</div>;
          case "pending":
            return <div>Pending Friends</div>;
          case "blocked":
            return <div>Blocked Friends</div>;
        case "add":
            return <div>Add Friend</div>
          default:
            return null;
        }
      };

      return (
        <nav className="app-nav">
          <ul>
            <li
              className={selectedNavItem === "online" ? "active" : ""}
              onClick={() => handleNavItemClick("online")}
            >
              Online Friends
            </li>
            <li
              className={selectedNavItem === "all" ? "active" : ""}
              onClick={() => handleNavItemClick("all")}
            >
              All Friends
            </li>
            <li
              className={selectedNavItem === "pending" ? "active" : ""}
              onClick={() => handleNavItemClick("pending")}
            >
              Pending Friends
            </li>
            <li
              className={selectedNavItem === "blocked" ? "active" : ""}
              onClick={() => handleNavItemClick("blocked")}
            >
              Blocked Friends
            </li>
            <li
              className={selectedNavItem === "add" ? "active" : ""}
              onClick={() => handleNavItemClick("add")}
            >
                Add Friend
            </li>
          </ul>

          {/* We need to add to the search bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button onClick={() => setSearchQuery("")}>Clear</button>
          </div>

          <div className="content-container">{renderContent()}</div>
        </nav>
      );
    }

export default AppNavigation;
