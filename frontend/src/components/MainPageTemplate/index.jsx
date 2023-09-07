import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServerList from "../ServerList";
import "../../styles/components/MainPageTemplate.css";
import { thunkGetServerInfo, updateUserStatus } from "../../store/singleServer";
import { MainLoader } from "../Loading/MainLoader";
import ChannelMenuDrop from "../ChannelList/ChannelMenuDrop";
import SendMessage from "../SendMessage";
import { ChannelHeader } from "../Channel/ChannelHeader";
import { ServerUsersList } from "../server/ServerUsersList";
import FriendBar from "../FriendList/FriendBar";
import FriendList from "../FriendList";
import UserProfile from "../UserProfile";
import ChannelBrowser from "../ChannelList/ChannelBrowser";
import { ChannelMessageList } from "../Channel/ChannelMessageList";
import DirectMessage from "../DirectMessage";
import DirectMessageSearch from "../DirectMessage/DirectMessageSearch";
import { DirectMessageList } from "../DirectMessage/DirectMessageList";
import DirectMessageHeader from "../DirectMessage/DirectMessageHeader";
import DirectMessageSendMessage from "../DirectMessage/DirectMessageSendMessage";
import { io } from "socket.io-client";
import Developers from "../Developers:D";
import DirectMessageUserSection from "../DirectMessage/DirectMessageUserSection";

function MainPageTemplate() {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const singleServerId = useSelector((state) => state.singleServer.id);
  const { serverId } = useParams();
  const [oldServerId, setOldServerId] = useState(serverId);
  const [selectedState, setSelectedState] = useState("");
  const [directMessageSearch, setdirectMessageSearch] = useState("");
  const dispatch = useDispatch();
  const loc = location.pathname.split("/").filter((el) => el !== "");
  const [socketInstance, setSocketInstance] = useState(null);


  useEffect(() => {
    // TODO clean this up
    (async () => {
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
      setSocketInstance(
        io(import.meta.env.VITE_APP_WS_URL || "localhost:5000/", {
          cors: {
            origin: "*",
          },
        })
      );
    })();
  }, [dispatch]);

  useEffect(() => {
    // TODO impelement away status here
    if (socketInstance) {
      socketInstance.on("connect", () => {
        if (user) {
          socketInstance.emit("user_connected", user.id);
          socketInstance.on("user_status", (other_user) => {
            if (user) {
              if (other_user.user_id != user.id) {
                // set online status of user in servers
                dispatch(updateUserStatus(other_user));
              }
            }
          });
        }
      });
    }
  }, [socketInstance]);

  useEffect(() => {
    if (singleServerId == null) {
      setOldServerId(null);
    }
  }, [singleServerId]);

  //   TODO again not a good way of doing this. Come back to this.... or else
  if (serverId && loc.length == 2 && !singleServerId) {
    return <MainLoader />;
  }

  const goToMain = () => {
    history.push("/login")
  }

  return (
    <>
      { user ? <div className="main-page-container" id="main">
        <Switch>
          <Route exact path="/@">
            <div className="main-page-container__item main-page-container__item--1">
              <ServerList />
            </div>
            <div className="main-page-container__item main-page-container__item--2">
              <DirectMessageSearch
                searchString={directMessageSearch}
                setSearchString={setdirectMessageSearch}
              />
            </div>
            <div className="main-page-container__item main-page-container__item--3">
              <FriendBar
                selectedTab={selectedState}
                setSelectedTab={setSelectedState}
              />
            </div>
            <div className="main-page-container__item main-page-container__item--4">
              <UserProfile />
              <DirectMessage searchString={directMessageSearch} />
            </div>
            <div className="main-page-container__item main-page-container__item--5">
              <FriendList
                selectedTab={selectedState}
                setSelectedTab={setSelectedState}
              />
            </div>
            <div className="main-page-container__item main-page-container__item--6"></div>
            <div className="main-page-container__item main-page-container__item--7">
              <Developers />
            </div>
          </Route>
          <Route path="/@/:directMessageId">
            <div className="main-page-container__item main-page-container__item--1">
              <ServerList />
            </div>
            <div className="main-page-container__item main-page-container__item--2">
              <DirectMessageSearch
                searchString={directMessageSearch}
                setSearchString={setdirectMessageSearch}
              />
            </div>
            <div className="main-page-container__item main-page-container__item--3">
              <DirectMessageHeader />
            </div>
            <div className="main-page-container__item main-page-container__item--4">
              <UserProfile />
              <DirectMessage searchString={directMessageSearch} />
            </div>
            <div className="main-page-container__item main-page-container__item--5">
              <DirectMessageList socket={socketInstance} />
            </div>
            <div className="main-page-container__item main-page-container__item--6">
              <DirectMessageSendMessage socket={socketInstance} />
            </div>
            <div className="main-page-container__item main-page-container__item--7">
              <DirectMessageUserSection />
            </div>
          </Route>
          <Route path="/:serverId/:channelId">
            <div className="main-page-container__item main-page-container__item--1">
              <ServerList />
            </div>
            <div className="main-page-container__item main-page-container__item--2">
              <div className="dm-list-header">
                <ChannelMenuDrop />
              </div>
            </div>
            <div className="main-page-container__item main-page-container__item--3">
              <ChannelHeader />
            </div>
            <div className="main-page-container__item main-page-container__item--4">
              <UserProfile />
              <ChannelBrowser socket={socketInstance} />
            </div>
            <div className="main-page-container__item main-page-container__item--5">
              <ChannelMessageList socket={socketInstance} />
            </div>
            <div className="main-page-container__item main-page-container__item--6">
              <SendMessage socket={socketInstance} />
            </div>
            <div className="main-page-container__item main-page-container__item--7">
              <ServerUsersList />
            </div>
          </Route>
        </Switch>
      </div> : <>{goToMain()}</> }
    </>
  );
}

export default MainPageTemplate;
