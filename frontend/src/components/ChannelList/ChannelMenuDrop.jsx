import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import "../../styles/components/ChannelMenuDrop.css"

function ChannelMenuDrop({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user)
  const ulRef = useRef();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "channel-menu-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {showMenu ? <i onClick={openMenu} class="fa-solid fa-xmark channel-menu-button"></i> : <i onClick={openMenu} class="fa-solid fa-angle-down channel-menu-button fa-sm"></i> }
      <ul className={ulClassName} ref={ulRef}>
        {sessionUser ? (
          <div className="channel-menu-container">
              <p className="channel-menu-option">Edit Server Profile<i class="fa-solid fa-pencil"></i></p>
              <p className="channel-menu-option">Create a Channel<i class="fa-solid fa-circle-plus"></i></p>
              <p className="channel-menu-border"></p>
              <p className="channel-menu-option-delete">Delete Server<i class="fa-solid fa-trash-can"></i></p>
          </div>
        ) : (
          <>
            <h1>wait you're not the user</h1>
          </>
        )}
      </ul>
    </>
  );
}

export default ChannelMenuDrop;
