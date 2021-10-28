import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loader from '../components/loader'
import styled from 'styled-components'

const Profile = props => {
  const [token, setToken] = useState(
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : ''
  )
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [topArtists, setTopArtists] = useState(null)
  const [error, setError] = useState(false)
  const USER_ME_ENDPOINT = 'https://api.spotify.com/v1/me'
  const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists'
  const history = useHistory()
  const disconnect = () => {
    props.setLoggedIn(false)
  }

  //If disconnected -> redirect to login
  if (!props.loggedIn) {
    history.push('/')
  }

  //Redirect to login if token empty
  useEffect(() => {
    if (token === '') {
      history.push('/')
    }
  }, [])

  //Token
  useEffect(() => {
    if (token != '') {
      console.log(`Token : ${token}`)
      getUser()
    }
  }, [token])

  //User
  useEffect(() => {
    if (user != null) {
      getTopArtists()
    }
  }, [user])

  //Top artists
  useEffect(() => {
    console.log('USER', user)
    console.log('TOP Artist', topArtists)
    if (topArtists != null) {
      setIsLoading(false)
    }
  }, [topArtists])

  const getUser = () => {
    axios
      .get(USER_ME_ENDPOINT, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        console.log('GET Users', response)
        setUser(response.data)
      })
      .catch(err => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })
  }

  const getTopArtists = () => {
    axios
      .get(TOP_ARTISTS_ENDPOINT, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        console.log('GET artists', response.data)
        setTopArtists(response.data)
      })
      .catch(err => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div>
        <p>Error</p>
        <button onClick={getUser()}>Réessayer</button>
        <button onClick={disconnect()}>Se reconnecter</button>
      </div>
    )
  }

  return (
    <ProfileContainer>
      <ProfilePic src={user.images[0]?.url} />
      <p>{user.display_name}</p>
      <p>Followers : {user.followers.total}</p>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`

const ProfilePic = styled.img`
  height: 300px;
  width: 300px;
  border-radius: 150px;
`

export default Profile
