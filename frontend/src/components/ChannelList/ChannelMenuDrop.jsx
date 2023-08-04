import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import OpenModalSpan from "../OpenModalSpan";
import DeleteModal from "../DeleteModal";
import "../../styles/components/ChannelMenuDrop.css";
import CreateChannelModal from "../CreateChannelModal";
import UpdateServerModal from "../UpdateServerModal";
import LeaveServerModal from "../LeaveServerModal";

function ChannelMenuDrop({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { serverId, channelId } = useParams();
  const server = useSelector((state) => state.servers[serverId]);
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();
  console.log("server", server);

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

  const ulClassName = "channel-menu-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <p>{server?.name}</p>
      {server?.owner_id === sessionUser?.id ? (
        showMenu ? (
          <i
            onClick={openMenu}
            class='fa-solid fa-xmark channel-menu-button'
          ></i>
        ) : (
          <i
            onClick={openMenu}
            class='fa-solid fa-angle-down channel-menu-button fa-sm'
          ></i>
        )
      ) : (
        showMenu ? (
          <i
            onClick={openMenu}
            class='fa-solid fa-xmark channel-menu-button'
          ></i>
        ) : (
          <i
            onClick={openMenu}
            class='fa-solid fa-angle-down channel-menu-button fa-sm'
          ></i>
        )
      )}
        {sessionUser?.id === server?.owner.id ? (
        <ul className={ulClassName} ref={ulRef}>
          <div className='channel-menu-container'>
            <span onClick={closeMenu}>
              <OpenModalSpan
                className={"channel-menu-option channel-menu-option__edit"}
                modalComponent={<UpdateServerModal />}
                buttonText={"Edit Server Profile"}
              />
            </span>
            <span onClick={closeMenu}>
              <OpenModalSpan
                className={"channel-menu-option channel-menu-option__create"}
                modalComponent={<CreateChannelModal serverId={server?.id} />}
                buttonText={"Create a channel"}
              />
            </span>
            <p className='channel-menu-border'></p>
            <span onClick={closeMenu}>
              <OpenModalSpan
                className={"channel-menu-option-delete"}
                modalComponent={<DeleteModal type={"server"} />}
                buttonText={"Delete Server"}
              />
            </span>
          </div>
        </ul>
        ) : (
          <ul ref={ulRef} className={showMenu ? "channel-menu-dropdown_member" : "channel-menu-dropdown_member hidden"}>
            <span onClick={closeMenu} >
              <OpenModalSpan
                className={"channel-menu-option channel-menu-option-delete"}
                modalComponent={<LeaveServerModal server={server}/>}
                buttonText={"Leave Server"}
              />
              </span>
          </ul>
        )}
    </>
  );
}

export default ChannelMenuDrop;
