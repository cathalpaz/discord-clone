import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends } from "../../store/session";

function FriendList({ isLoaded, selectedTab}) {
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

  console.log('friendstore', friendStore)


  const searchMessages = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    if (selectedNavItem === "online") {
        return (
        <div className="content-online">
            <h2>{selectedTab}</h2>
            {friendStore &&
            friendStore.map((friend) => (
                <div key={friend.id}>{friend.user_from}
                </div>
            ))}
        </div>
        );
    } else if (selectedNavItem === "all") {
        return (
        <div className="content-all">
            <h2>{selectedTab}</h2>
            {friendStore &&
            friendStore.map((friend) => (
                <div key={friend.id}>
                <p>{friend.id}</p>
                <p>{friend.user_from}</p>
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

  let asd = document.querySelector(".active")
  console.log('asd', asd)
  return (

    <div className="discord">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={searchMessages}
            className="search-input-bar"
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
      </div>
      <div className="content-container">{renderContent()}</div>
    </div>
  );
}

export default FriendList;
