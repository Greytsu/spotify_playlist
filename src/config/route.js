import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import React, { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Login from "../screens/login";
import Playlist from "../screens/playlist";
import GlobalStyle from "./globalStyle";
import { lightTheme, darkTheme } from "./themes";
import Profile from "../screens/profile";

const Routes = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [loggedIn, setLoggedIn] = useState(true);
  const history = useHistory();

  //Inverse le thème
  const switchTheme = () => {
    if (currentTheme.name === "light") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }

    console.log("🚀 current theme : ", currentTheme.name);
  };

  //Si pas loggé redirection vers login
  useEffect(() => {
    if (!loggedIn) {
      //history.push("/login");
    }
  }, [loggedIn]);

  return (
    <div>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Router>
          <div>
            {loggedIn ? <Navigation themeSwitcher={switchTheme} /> : null}

            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/playlists">
                <Playlist />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default Routes;
