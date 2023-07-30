import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/Landingpage";
import AppNavigation from "./components/AppNavBar";

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
            <MainPageTemplate />
            {/* <LandingPage /> */}
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/register'>
            <SignupFormPage />
          </Route>
          <Route path='/channels'>
            <AppNavigation />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
