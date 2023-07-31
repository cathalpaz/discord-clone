import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ChannelList from "./components/ChannelList";
import LandingPage from "./components/LandingPage";
import MainPageTemplate from "./components/MainPageTemplate";
import FriendList from "./components/FriendList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/:serverId/:channelId'>
            <ChannelList />
          </Route>
          <Route path='/main'>
            <MainPageTemplate />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/register'>
            <SignupFormPage />
          </Route>
          <Route path='/channels'>
            <FriendList />
          </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
