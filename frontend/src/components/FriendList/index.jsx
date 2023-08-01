import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends } from "../../store/session";

function FriendList({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const friendStore = useSelector((state) => state.session.friends)
  const [selectedNavItem, setSelectedNavItem] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch]);

  const navbarItem = (navItem) => {
    setSelectedNavItem(navItem);
  };

  const searchMessages = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    if (selectedNavItem === "online") {
      return (
        <div className="content-online">
          <h2>Online</h2>
          {friendStore &&
            friendStore.map((friend) => (
              <div key={friend.id}>{friend.username}</div>
            ))}
        </div>
      );
    } else if (selectedNavItem === "all") {
      return (
        <div className="content-all">
          <h2>All Friends</h2>
          {friendStore &&
            friendStore.map((friend) => (
              <div key={friend.id}>
                <p>{friend.username}</p>
              </div>
            ))}
        </div>
      );
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
              </li>
              <li>
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
              </li>
              <li>
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
