import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import {
  fetchFriends,
  thunkAcceptFriendRequest,
  thunkRejectFriendRequest,
  thunkSendFriendRequest,
} from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addDmUser } from "../../store/directMessages";
import FriendMenuDrop from "./FriendMenuDrop";

function FriendList({ selectedTab, setSelectedTab }) {
  const friendStore = useSelector((state) => state.session.friends);
  const user = useSelector((state) => state.session.user);
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

  const sendFriendRequest = async () => {
    const res = await dispatch(thunkSendFriendRequest(searchQuery));
    if (res) {
      setSearchQuery("");
      setSelectedTab("Pending");
    }
  };

  const pendingFriendRequest = async (answer, friend) => {
    if (answer === "yes") {
      const res = await dispatch(
        thunkAcceptFriendRequest(friend.user.username)
      );
    } else if (answer === "no") {
      const res = await dispatch(
        thunkRejectFriendRequest(friend.user.username)
      );
    }
  };

  const sendToDiscovery = () => {
    history.push("/discovery");
  };

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
    if (selectedTab === "Online") {
      return (
        <div className="content-online">
          <h2 className="heading-class">
            {filteredFriends.length === 0
              ? ""
              : selectedTab.toUpperCase() + " -"}{" "}
            {filteredFriends.length !== 0 ? filteredFriends.length : ""}
          </h2>
          <div className="friend-list-user-container">
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
                <>
                  <div className="friend-list-heading-border"></div>

                  <div
                    className="friend-list-user"
                    key={friend.id}
                    onMouseEnter={() => handleFriendHover(friend.id, true)}
                    onMouseLeave={() => handleFriendHover(friend.id, false)}
                  >
                    <div className="friend-list-user-info">
                      <img src={friend.user.avatar} alt="" />
                      <p style={{ marginLeft: ".5rem" }}>
                        {friend.user.username}
                      </p>
                      {hoverStates[friend.id] && <p>#{friend.id}</p>}
                    </div>
                    <div className="icons-container">
                      <div className="messages">
                        <i
                          onClick={() => {
                            dispatch(addDmUser(friend.user.id, friend.user));
                            history.push(`/@/${friend.user.id}`);
                          }}
                          className="fas fa-message fa-lg"
                        ></i>
                      </div>
                      <div className="dots">
                        <FriendMenuDrop friend={friend}/>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      );
    } else if (selectedTab === "All") {
      return (
        <div className="content-online">
          <h2 className="heading-class">
            {filteredFriends.length === 0
              ? ""
              : selectedTab.toUpperCase() + " -"}{" "}
            {filteredFriends.length !== 0 ? filteredFriends.length : ""}
          </h2>
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
              <div></div>
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <>
                <div className="friend-list-heading-border"></div>
                <div
                  className="friend-list-user"
                  key={friend.id}
                  onMouseEnter={() => handleFriendHover(friend.id, true)}
                  onMouseLeave={() => handleFriendHover(friend.id, false)}
                >
                  <div className="friend-list-user-info">
                    <img src={friend.user.avatar} alt="" />
                    <p style={{ marginLeft: ".5rem" }}>
                      {friend.user.username}
                    </p>
                    {hoverStates[friend.id] && <p>#{friend.id}</p>}
                  </div>
                  <div className="icons-container">
                    <div className="messages">
                      <i
                        onClick={() => {
                          dispatch(addDmUser(friend.user.id, friend.user));
                          history.push(`/@/${friend.user.id}`);
                        }}
                        className="fas fa-message fa-lg"
                      ></i>
                    </div>
                    <div className="dots">
                      <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                    </div>
                  </div>
                </div>
              </>
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
            <div className="Add-Friend">OTHER PLACES TO MAKES FRIENDS</div>
            <span
              onClick={sendToDiscovery}
              className="friend-list-discovery-button"
            >
              <i className="fa-solid fa-compass friend-list-discovery-icon"></i>
              <p
                style={{
                  fontWeight: "500",
                  color: "var(--light-accent)",
                  marginLeft: ".5rem",
                }}
              >
                Explore Discoverable Servers
              </p>
              <i
                style={{
                  color: "var(--light-accent)",
                  marginLeft: "1.2rem",
                  fontSize: "18px",
                }}
                className="fa-solid fa-chevron-right"
              ></i>
            </span>
          </div>
          <div className="no-friend-container">
            <div className="loner-wumpus">
              <img src={"/images/wumpus-add-friend.svg"} alt="" />
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
          <h2 className="heading-class">
            {pendingFriends.length === 0
              ? ""
              : selectedTab.toUpperCase() + " -"}{" "}
            {pendingFriends.length !== 0 ? pendingFriends.length : ""}
          </h2>
          {pendingFriends.length === 0 ? (
            <div className="no-friend-container">
              <img src={"/images/NoPending.svg"} alt="" />
              <p className="no-friends-txt">
                There are no pending friend requests. Here's Wumpus for now.
              </p>
            </div>
          ) : (
            pendingFriends.map((friend) => (
              <>
                <div className="friend-list-heading-border"></div>
                <div
                  className="friend-list-user"
                  key={friend.id}
                  onMouseEnter={() => handleFriendHover(friend.id, true)}
                  onMouseLeave={() => handleFriendHover(friend.id, false)}
                >
                  <div className="friend-list-user-info">
                    <img src={friend.user.avatar} alt="" />
                    <p style={{ marginLeft: ".5rem" }}>
                      {friend.user.username}
                    </p>
                    {hoverStates[friend.id] && <p>#{friend.id}</p>}
                  </div>
                  <div className="icons-container">
                    {friend.user_from != user.id && (
                      <div
                        className="check"
                        onClick={() => pendingFriendRequest("yes", friend)}
                      >
                        <i className="fa-solid fa-check fa-lg"></i>
                      </div>
                    )}
                    <div
                      className="reject"
                      onClick={() => pendingFriendRequest("no", friend)}
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>
                  </div>
                </div>
              </>
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
