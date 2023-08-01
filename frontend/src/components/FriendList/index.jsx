import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/FriendList.css";
import { fetchFriends } from "../../store/session";

function FriendList({ selectedTab }) {
    const sessionUser = useSelector((state) => state.session.user);
    const friendStore = useSelector((state) => state.session.friends);
    const [selectedNavItem, setSelectedNavItem] = useState("online");
    const [searchQuery, setSearchQuery] = useState("");
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    const searchMessages = (event) => {
        setSearchQuery(event.target.value);
    };

    //this is so we can style the "Online" & "All" text.
    const headingClassName = "heading-class"

    //make friends list go away if not on correct tab
    const handleAddFriendClick = () => {
      setIsAddingFriend(!isAddingFriend);
  };

    const renderContent = () => {
      if (selectedTab === "Online") {
          return (
              <div className="content-online">
                  <h2 className={headingClassName}>{selectedTab}</h2>
                  {friendStore &&
                      friendStore.map((friend) => (
                          <div key={friend.id}>
                              {friend.user_from}
                              <p>{friend.user.username}</p>
                              <p>{friend.user.avatar}</p>
                          </div>
                      ))}
              </div>
          );
      } else if (selectedTab === "All") {
          return (
              <div className="content-all">
                  <h2 className={headingClassName}>{selectedTab}</h2>
                  {friendStore &&
                      friendStore.map((friend) => (
                          <div key={friend.id}>
                              <p>{friend.id}</p>
                              <p>{friend.user.username}</p>
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
