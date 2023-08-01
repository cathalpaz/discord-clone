import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import ServerList from "../ServerList";
import { thunkGetServerInfo } from "../../store/singleServer";
import { MainLoader } from "../Loading/MainLoader";
import "../../styles/components/MainPageTemplate.css";

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
        {leftTab}
        <div className='general-view-container'>
          {rightTab}
        </div>
      </div>
    </>
  );
}

export default MainPageTemplate;
