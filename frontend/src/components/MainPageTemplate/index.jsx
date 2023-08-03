import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import ServerList from "../ServerList";
import "../../styles/components/MainPageTemplate.css";
import {
  thunkGetServerInfo,
  updateSelectedChannelId,
  updateUserStatus,
} from "../../store/singleServer";
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
import SearchServerHeader from "../SearchServers/SearchServerHeader";
import SearchServerList from "../SearchServers/SearchServerList";
import SearchServers from "../SearchServers";

function MainPageTemplate({ leftTab, rightTab }) {
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const { serverId, channelId, directMessageId } = useParams();
  const [oldServerId, setOldServerId] = useState(serverId);
  const [selectedState, setSelectedState] = useState("");
  const [directMessageSearch, setdirectMessageSearch] = useState("");
  const dispatch = useDispatch();
  const loc = location.pathname.split("/").filter((el) => el !== "");
  const singleServerId = useSelector((state) => state.singleServer.id);
  const [socketInstance, setSocketInstance] = useState(null);
  const server = useSelector((state) => state.singleServer);
  const selectedChannelId = useSelector(
    (state) => state.singleServer.selectedChannelId
  );

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
        io("localhost:5000/", {
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
                console.log("SDKLFJKLSDJFLKSDJKLFJKSDJF");
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

  return (
    <>
      <div className='main-page-container'>
        <Switch>
          <Route exact path='/@'>
            <div className='main-page-container__item main-page-container__item--1'>
              <ServerList />
            </div>
            <div className='main-page-container__item main-page-container__item--2'>
              <DirectMessageSearch
                searchString={directMessageSearch}
                setSearchString={setdirectMessageSearch}
              />
            </div>
            <div className='main-page-container__item main-page-container__item--3'>
              <FriendBar
                selectedTab={selectedState}
                setSelectedTab={setSelectedState}
              />
            </div>
            <div className='main-page-container__item main-page-container__item--4'>
              <UserProfile />
              <DirectMessage searchString={directMessageSearch} />
            </div>
            <div className='main-page-container__item main-page-container__item--5'>
              <FriendList selectedTab={selectedState} />
            </div>
            <div className='main-page-container__item main-page-container__item--6'></div>
            <div className='main-page-container__item main-page-container__item--7'></div>
          </Route>
          <Route path='/@/:directMessageId'>
            <div className='main-page-container__item main-page-container__item--1'>
              <ServerList />
            </div>
            <div className='main-page-container__item main-page-container__item--2'>
              <DirectMessageSearch
                searchString={directMessageSearch}
                setSearchString={setdirectMessageSearch}
              />
            </div>
            <div className='main-page-container__item main-page-container__item--3'>
              <DirectMessageHeader />
            </div>
            <div className='main-page-container__item main-page-container__item--4'>
              <UserProfile />
              <DirectMessage searchString={directMessageSearch} />
            </div>
            <div className='main-page-container__item main-page-container__item--5'>
              <DirectMessageList />
            </div>
            <div className='main-page-container__item main-page-container__item--6'>
              <DirectMessageSendMessage />
            </div>
            <div className='main-page-container__item main-page-container__item--7'></div>
          </Route>
          <Route path='/:serverId/:channelId'>
            <div className='main-page-container__item main-page-container__item--1'>
              <ServerList />
            </div>
            <div className='main-page-container__item main-page-container__item--2'>
              <div className='dm-list-header'>
                <ChannelMenuDrop />
              </div>
            </div>
            <div className='main-page-container__item main-page-container__item--3'>
              <ChannelHeader />
            </div>
            <div className='main-page-container__item main-page-container__item--4'>
              <UserProfile />
              <ChannelBrowser socket={socketInstance} />
            </div>
            <div className='main-page-container__item main-page-container__item--5'>
              <ChannelMessageList socket={socketInstance} />
            </div>
            <div className='main-page-container__item main-page-container__item--6'>
              <SendMessage socket={socketInstance} />
            </div>
            <div className='main-page-container__item main-page-container__item--7'>
              <ServerUsersList />
            </div>
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default MainPageTemplate;
