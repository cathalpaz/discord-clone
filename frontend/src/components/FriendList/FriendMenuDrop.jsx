import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/FriendMenuDrop.css";

function FriendMenuDrop({ friend }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current) {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "friend-list-menu-dropdown" + (showMenu ? "" : " hidden");

  const deleteFriend = () => {
    alert("Feature coming soon!")
  }

  return (
    <>
      <i onClick={openMenu} className="fa-solid fa-ellipsis-vertical fa-xl"></i>

      <ul className={ulClassName} ref={ulRef}>
        <div className="friend-list-menu-option">
          <div onClick={deleteFriend} className="delete-friend-container">
            <p>Delete Friend ({friend.user.username})</p>
            <i className='fa-solid fa-trash'></i>
          </div>
        </div>
      </ul>
    </>
  );
}

export default FriendMenuDrop;
