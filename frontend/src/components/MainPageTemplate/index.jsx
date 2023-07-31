import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import ServerList from "../ServerList";
import "../../styles/components/MainPageTemplate.css";
import FriendList from "../FriendList";
import { DmListContainer } from "./DmListContainer";
import { thunkGetServerInfo } from "../../store/singleServer";
import { MainLoader } from "../Loading/MainLoader";

function MainPageTemplate({ leftTab, rightTab }) {
  const location = useLocation();
  const { serverId, channelId } = useParams();
  const [oldServerId, setOldServerId] = useState(serverId);
  const dispatch = useDispatch();
  const loc = location.pathname.split("/").filter((el) => el !== "");
  const singleServerId = useSelector((state) => state.singleServer.id);

  useEffect(() => {
    // TODO clean this up
    (async () => {
      console.log("THIS IS RUNNING");
      console.log(oldServerId, serverId);
      if (
        location.pathname.split("/").filter((el) => el !== "").length == 2 &&
        serverId !== oldServerId
      ) {
        await dispatch(thunkGetServerInfo(serverId));
        setOldServerId(serverId);
      }
    })();
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      if (location.pathname.split("/").filter((el) => el !== "").length == 2) {
        await dispatch(thunkGetServerInfo(serverId));
        setOldServerId(serverId);
      }
    })();
  }, [dispatch]);

  //   TODO again not a good way of doing this. Come back to this.... or else
  if (serverId && loc.length == 2 && !singleServerId) {
    return <MainLoader />;
  }

  return (
    <>
      <div className='main-page-container'>
        <div className='server-list-container'>
          <ServerList />
        </div>
        {/* <div className='dm-list-container'>
          <div className='dm-list-header'>asd</div>
        </div> */}
        {leftTab}
        <div className='general-view-container'>
          <div className='general-view-header'></div>
          {rightTab}
        </div>
      </div>
    </>
  );
}

export default MainPageTemplate;
