import React, { useEffect }  from 'react'

export default function FriendBar({ selectedTab, setSelectedTab }) {

    useEffect(() => {
        setSelectedTab("Online")
    },[setSelectedTab])

  return (
    <div className="friends-bar">
    <div className="general-view-header">
      <div className="friends-h1">
        <i className="fa-solid fa-users"></i>
        <h2 style={{fontSize:"16px", fontWeight:"600"}}>Friends</h2>
      </div>
      <div className="divider"></div>
      <nav className="app-nav">
        <div className="text-bar">
            <button
              className={
                selectedTab === "Online"
                  ? "active nav-button online-friend"
                  : "nav-button online-friend"
              }
              onClick={() => setSelectedTab("Online")}
            >
              Online
            </button>
            <button
              className={
                selectedTab === "All"
                  ? "active nav-button online-friend"
                  : "nav-button online-friend"
              }
              onClick={() => setSelectedTab("All")}
            >
              All
            </button>
            <button
              className={
                selectedTab === "Add"
                  ? "active nav-button add-friend"
                  : "nav-button add-friend"
              }
              onClick={() => setSelectedTab("Add")}
            >
              Add Friend
            </button>
        </div>
      </nav>
    </div>
      </div>
  )
}
