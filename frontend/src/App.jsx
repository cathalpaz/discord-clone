import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import MainPageTemplate from "./components/MainPageTemplate";
import NotFoundPage from "./components/NotFoundPage";
import Chat from "./components/WebSocket";
import SearchServers from "./components/SearchServers";

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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/@/:directMessageId">
            <MainPageTemplate />
          </Route>
          <Route exact path="/:serverId/:channelId">
            <MainPageTemplate />
          </Route>
          <Route path="/discovery">
            <SearchServers />
          </Route>
          <Route path="/@">
            <MainPageTemplate />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/register">
            <SignupFormPage />
          </Route>
          <Route path="/websocket">
            <Chat />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
