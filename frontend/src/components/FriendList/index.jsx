import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends, thunkSendFriendRequest } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function FriendList({ selectedTab }) {
  const friendStore = useSelector((state) => state.session.friends);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoverStates, setHoverStates] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

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

  const sendFriendRequest = () => {
    dispatch(thunkSendFriendRequest(searchQuery));
  };

  const sendToDiscovery = () => {
    history.push("/discovery")
  }

  let filteredFriends = [];
  let pendingFriends = [];
  if (friendStore) {
    filteredFriends = friendStore.filter(
      (friend) =>
        friend.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) && friend.status === "ACCEPTED"
    );
    pendingFriends = friendStore.filter(
      (friend) =>
        friend.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) && friend.status === "PENDING"
    );
  }

  const renderContent = () => {
    // setSearchQuery("")
    if (selectedTab === "Online") {
      // setSearchQuery(n)
      return (
        <div className="content-online">
          <h2 className="heading-class">{filteredFriends.length === 0 ? "" : selectedTab} {filteredFriends.length !== 0 ? filteredFriends.length : ""}</h2>
          {filteredFriends.length === 0 ? (
            <div className="no-friend-container">
              <img
                className="offline-wumpus"
                src={"/images/NoOnline.svg"}
                alt=""
              />
              <p className="no-friends-txt">
                No one's around to play with Wumpus.
              </p>
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
    } else if (selectedTab === "All") {
      return (
        <div className="content-online">
          <h2 className="heading-class">{filteredFriends.length === 0 ? "" : selectedTab} {filteredFriends.length !== 0 ? filteredFriends.length : ""}</h2>
          {filteredFriends.length === 0 ? (
            <div className="no-friend-container">
              <img
                className="no-friends"
                src={"/images/NoFriends.svg"}
                alt=""
              />
              <p className="no-friends-txt">
                Wumpus is waiting on friends. You don't have to though!
              </p>
              <div>
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
          <div className="Add-Input">
            <input
              type="text"
              placeholder="You can add friends with their Discord username."
              value={searchQuery}
              onChange={searchMessages}
              className="add-a-friend-bar"
            />
            <div className="Add-button-container">
              <button onClick={sendFriendRequest} className="send-request">
                Send Friend Request
              </button>
            </div>
          </div>
          <div className="friend-list-border"></div>
          <div className="friend-list-discovery-container">
            <div className="Add-Friend">
              OTHER PLACES TO MAKES FRIENDS
            </div>
            <span onClick={sendToDiscovery} className="friend-list-discovery-button">
              <i class="fa-solid fa-compass friend-list-discovery-icon"></i>
              <p style={{fontWeight:"500", color:"var(--light-accent)", marginLeft:".5rem"}}>Explore Discoverable Servers</p>
              <i style={{color:"var(--light-accent)", marginLeft:"1.2rem", fontSize:"18px"}}class="fa-solid fa-chevron-right"></i>
            </span>
          </div>
          <div className="no-friend-container">
            <div className="loner-wumpus">
              <img src="../../../public/images/wumpus-add-friend.svg" alt="" />
            </div>
            <div>
              <p className="loner-wumpus-text">
                Wumpus is waiting on friends. You don't have to though!
              </p>
            </div>
          </div>
        </div>
      );
    } else if (selectedTab === "Pending") {
      return (
        <div className="content-all">
          <h2 className="heading-class">{pendingFriends.length === 0 ? "" : selectedTab} {pendingFriends.length !== 0 ? pendingFriends.length : ""}</h2>
          {pendingFriends.length === 0 ? (
            <div className="no-friend-container">
              <img src="../../../public/images/NoPending.svg" alt="" />
              <p className="no-friends-txt">
                There are no pending friend requests. Here's Wumpus for now.
              </p>
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
