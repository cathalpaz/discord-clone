import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./AppNavBar.css"

function AppNavigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [selectedNavItem, setSelectedNavItem] = useState("home");
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
            case "add":
                return <div>Add Friend</div>;
            default:
                return null;
        }
    };

    return (
        <div className="discord">
            <nav className="app-nav">
                <ul>
                    <li
                        className={selectedNavItem === "online" ? "active" : ""}
                        onClick={() => navbarItem("online")}
                    >
                        Online Friends
                    </li>
                    <li
                        className={selectedNavItem === "all" ? "active" : ""}
                        onClick={() => navbarItem("all")}
                    >
                        <p> All Friends </p>
                    </li>
                    <li
                        className={selectedNavItem === "add" ? "active" : ""}
                        onClick={() => navbarItem("add")}
                    >
                        Add Friend
                    </li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Find or start a conversation"
                        value={searchQuery}
                        onChange={searchMessages}
                    />
                    <button onClick={() => setSearchQuery("")}>Clear</button>
                </div>

                <div className="content-container">{renderContent()}</div>
            </nav>
        </div>
    );
}

export default AppNavigation;
