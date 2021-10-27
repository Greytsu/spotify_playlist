import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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

const getStoredTheme = () => {
  const themeName = localStorage.getItem('theme')
  if (themeName) {
    return themeName == 'light' ? lightTheme : darkTheme
  }
  return lightTheme
}

const Routes = () => {
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme())
  const [loggedIn, setLoggedIn] = useState(true)
  const history = useHistory()

  //Switch between dark and light theme
  const switchTheme = () => {
    console.log('switching theme')
    currentTheme.name === 'light'
      ? setCurrentTheme(darkTheme)
      : setCurrentTheme(lightTheme)
  }

  //If not logged redirect to login page
  useEffect(() => {
    if (!loggedIn) {
      history.push('/login')
    }
  }, [])

  //Set local storage
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
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/playlists'>
                <Playlists />
              </Route>
              <Route exact path='/playlistsDetails/:id'>
                <PlaylistDetails />
              </Route>
              <Route exact path='/profile'>
                <Profile />
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
