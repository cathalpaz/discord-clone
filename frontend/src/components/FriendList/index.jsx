import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends } from "../../store/session";

function FriendList({ selectedTab }) {
  const sessionUser = useSelector((state) => state.session.user);
  const friendStore = useSelector((state) => state.session.friends);
  const [searchQuery, setSearchQuery] = useState("");
  const [addFriend, setAddFriend] = useState("");
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

  //add friend button to direct you to Add tab
  const handleAddFriendClick = () => {
    setSelectedTab("Add");
  };


  let filteredFriends = [];
  let pendingFriends = [];
  if (friendStore) {
    filteredFriends = friendStore.filter(
      (friend) =>
        friend.user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        friend.status === "ACCEPTED"
    );
    pendingFriends = friendStore.filter(
      (friend) =>
        friend.user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        friend.status === "PENDING"
    );
  }

  const renderContent = () => {
    if (selectedTab === "Online") {
      return (
        <div className="content-online">
          <h2 className="heading-class">{selectedTab}</h2>
          {filteredFriends.length === 0 ? (
            // <div className="content-add">
            <div>
              <p className="offline-wumpus-text">No one's around to play with Wumpus.</p>
              <img className="offline-wumpus"src="../../../public/images/NoOnline.svg" alt="" />
            </div>
            // </div>
          ) : (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                onMouseEnter={() => handleFriendHover(friend.id, true)}
                onMouseLeave={() => handleFriendHover(friend.id, false)}
              >
                <img src={friend.user.avatar} alt="" />
                <p>{friend.user.username}</p>
                {hoverStates[friend.id] && <p>#{friend.id}</p>}
                <div className="icons-container">
                  <div className="messages">
                    <i className="fas fa-message"></i>
                  </div>
                  <div className="dots">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    } else if (selectedTab === "All") {
      return (
        <div className="content-all">
          <h2 className="heading-class">{selectedTab}</h2>
          {filteredFriends.length === 0 ? (
                        <div className="content-add">
                        <p className="no-friends-txt">Wumpus is waiting on friends. You don't have to though!</p>
                        <img className="no-friends" src="../../../public/images/NoFriends.svg" alt="" />
                        <div>
                          <button className="send-request" onClick={handleAddFriendClick}>
                            Add Friend
                          </button>
                        </div>
                      </div>
          ) : (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                onMouseEnter={() => handleFriendHover(friend.id, true)}
                onMouseLeave={() => handleFriendHover(friend.id, false)}
              >
                <img src={friend.user.avatar} alt="" />
                <p>{friend.user.username}</p>
                {hoverStates[friend.id] && <p>#{friend.id}</p>}
                <div className="icons-container">
                  <div className="messages">
                    <i className="fas fa-message"></i>
                  </div>
                  <div className="dots">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    } else if (selectedTab === "Add") {
      return (
        <div className="content-add">
          <div className="Add-Friend">ADD FRIEND</div>
          <div className="Add-Desc">
            You can add friends with their Discord username
          </div>
          <input
            type="text"
            placeholder="You can add friends with their Discord username."
            value={searchQuery}
            onChange={searchMessages}
            className="add-a-friend-bar"
          />
          <button className="send-request">Send Friend Request</button>
          <div className="loner-wumpus">
            <img src="../../../public/images/wumpus-add-friend.svg" alt="" />
          </div>
          <div>
            <p className="loner-wumpus-text">
              Wumpus is waiting on friends. You don't have to though!
            </p>
          </div>
        </div>
      );
    } else if (selectedTab === "Pending") {
      return (
        <div className="content-all">
          <h2 className="heading-class">{selectedTab}</h2>
          {pendingFriends.length === 0 ? (
             <div>
             <p>There are no pending friend requests. Here's Wumpus for now.</p>
             <img src="../../../public/images/NoPending.svg" alt="" />
           </div>
          ) : (
            pendingFriends.map((friend) => (
              <div
                key={friend.id}
                onMouseEnter={() => handleFriendHover(friend.id, true)}
                onMouseLeave={() => handleFriendHover(friend.id, false)}
              >
                <img src={friend.user.avatar} alt="" />
                <p>{friend.user.username}</p>
                {hoverStates[friend.id] && <p>#{friend.id}</p>}
                <div className="icons-container">
                  <div className="messages">
                    <i className="fas fa-message"></i>
                  </div>
                  <div className="dots">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
    return null;
  };

  const renderSearchBar = () => {
    if (selectedTab === "Add" || selectedTab === "Pending") {
      return null;
    } else {
      return (
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
      );
    }
  };

  return (
    <div className="discord">
      {renderSearchBar()} {/* Render the search bar conditionally */}
      <div className="friend-list">
        <div className="content-container">{renderContent()}</div>
      </div>
    </div>
  );
}

export default FriendList;
