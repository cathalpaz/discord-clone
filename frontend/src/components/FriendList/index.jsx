import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends } from "../../store/session";

function FriendList({ selectedTab }) {
  const sessionUser = useSelector((state) => state.session.user);
  const friendStore = useSelector((state) => state.session.friends);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [hoverStates, setHoverStates] = useState({});

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const searchMessages = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFriendHover = (friendId, isHovering) => {
    setHoverStates((prevState) => ({
      ...prevState,
      [friendId]: isHovering,
    }));
  };

  let filteredFriends = []
    if (friendStore) {
      filteredFriends = friendStore.filter((friend) =>
    friend.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    }

  const renderContent = () => {
    if (selectedTab === "Online") {
      return (
        <div className="content-online">
          <h2 className="heading-class">{selectedTab}</h2>
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onMouseEnter={() => handleFriendHover(friend.id, true)}
              onMouseLeave={() => handleFriendHover(friend.id, false)}
            >
              <img src={friend.user.avatar} alt="" />
              <p>{friend.user.username}</p>
              {hoverStates[friend.id] && <p>#{friend.id}</p>}
            </div>
          ))}
        </div>
      );
    } else if (selectedTab === "All") {
      return (
        <div className="content-all">
          <h2 className="heading-class">{selectedTab}</h2>
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onMouseEnter={() => handleFriendHover(friend.id, true)}
              onMouseLeave={() => handleFriendHover(friend.id, false)}
            >
              <img src={friend.user.avatar} alt="" />
              <p>{friend.user.username}</p>
              {hoverStates[friend.id] && <p>#{friend.id}</p>}
              <i className="fa-solid fa-message"></i>
            </div>
          ))}
        </div>
      );
    } else if (selectedTab === "Add") {
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
      <div className="friend-list">
        <div className="content-container">{renderContent()}</div>
      </div>
    </div>
  );
}

export default FriendList;
