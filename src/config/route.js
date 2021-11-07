import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import React, { useEffect, useState } from 'react'
import Navigation from '../components/navigation'
import Login from '../screens/login'
import Playlists from '../screens/playlists'
import GlobalStyle from './globalStyle'
import { lightTheme, darkTheme } from './themes'
import Profile from '../screens/profile'
import PlaylistDetails from '../screens/playlistDetails'

const Routes = () => {
  //Get theme from local storage
  const getStoredTheme = () => {
    const themeName = localStorage.getItem('theme')
    if (themeName) {
      return themeName == 'light' ? lightTheme : darkTheme
    }
    return lightTheme
  }

  const [currentTheme, setCurrentTheme] = useState(getStoredTheme())
  const [loggedIn, setLoggedIn] = useState(true)

  //Switch between dark and light theme
  const switchTheme = () => {
    currentTheme.name === 'light'
      ? setCurrentTheme(darkTheme)
      : setCurrentTheme(lightTheme)
  }

  //Set theme name to local storage
  useEffect(() => {
    localStorage.setItem('theme', currentTheme.name)
  }, [currentTheme])

  return (
    <div>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Router>
          <div>
            <Switch>
              <Route exact path='/'>
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Route>
              <Route exact path='/playlists'>
                <Playlists loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Route>
              <Route exact path='/playlistsDetails/:id'>
                <PlaylistDetails
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              </Route>
              <Route exact path='/profile'>
                <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Route>
            </Switch>
            {loggedIn ? <Navigation themeSwitcher={switchTheme} /> : null}
          </div>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default Routes
