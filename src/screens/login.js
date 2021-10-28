import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import SpotifyLogo from '../components/logo'

const Login = props => {
  const history = useHistory()
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const AUTH_ENPOINT = process.env.REACT_APP_AUTH_ENDPOINT
  const REDIRECT_URL = 'http://localhost:3000/'
  const SPACE_DELIMITER = '%20'
  const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'playlist-read-private',
    'user-top-read'
  ]
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

  //Gets params sent by spotify in the url
  //Params returned by spotify : access_token, token_type, expires_in
  const getParamsFromSpotifyAuth = hash => {
    const stringHash = hash.substring(1)
    const params = stringHash.split('&')
    const paramsSplit = params.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split('=')
      accumulater[key] = value
      return accumulater
    }, {})

    return paramsSplit
  }

  //Redirect to spotify auth page
  const handleLogin = () => {
    window.location = `${AUTH_ENPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  //After spotify auth get and store params from url
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, token_type, expires_in } = getParamsFromSpotifyAuth(
        window.location.hash
      )
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('token_type', token_type)
      localStorage.setItem('expires_in', expires_in)
      console.log('logged')
      history.push('/playlists')
    }
  }, [])

  return (
    <Container>
      <LoginContainer>
        <SpotifyLogo />
        <LoginButton onClick={handleLogin}>Connexion</LoginButton>
      </LoginContainer>
    </Container>
  )
}

//Style-------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondary};
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 90vw;
  border-radius: 25px;
`

const LoginButton = styled.button`
  background-color: ${props => props.theme.accent};
  width: 50%;
  height 35px;
  border: 0;
  border-radius: 25px;
`

export default Login
