import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loader from '../components/loader'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import Artist from '../components/artist'

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
  const dispatch = useDispatch()
  const disconnect = () => {
    props.setLoggedIn(false)
  }

  //If disconnected -> redirect to login
  if (!props.loggedIn) {
    history.push('/')
  }

  //Redirect to login if token empty
  useEffect(() => {
    dispatch(actions.activePage.setActivePage('profile'))
    if (token === '') {
      history.push('/')
    }
  }, [])

  //Token
  useEffect(() => {
    if (token != '') {
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
        setUser(response.data)
      })
      .catch(err => {
        setError(true)
        setIsLoading(false)
      })
  }

  const getTopArtists = () => {
    axios
      .get(TOP_ARTISTS_ENDPOINT, {
        limit: 15,
        time_range: 'short_term',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        setTopArtists(response.data.items)
      })
      .catch(err => {
        setIsLoading(false)
        setError(true)
      })
  }

  //Page content----------------------------------------------------------------

  //Loader
  if (isLoading) {
    return <Loader />
  }

  //Error
  if (error) {
    return (
      <div>
        <p>Error</p>
        <button onClick={() => getUser()}>Réessayer</button>
        <button onClick={() => disconnect()}>Se reconnecter</button>
      </div>
    )
  }

  //Profile
  return (
    <ProfileContainer>
      <ProfileDetails>
        <ProfilePic src={user.images[0]?.url} />
        <p>{user.display_name}</p>
        <p>Followers : {user.followers.total}</p>
      </ProfileDetails>
      <TopArtistsContainer>
        <h2>Your top artists</h2>
        {topArtists.map(artist => {
          return <Artist artist={artist} />
        })}
      </TopArtistsContainer>
    </ProfileContainer>
  )
}

//Style-------------------------------------------------------------------------

const ProfileContainer = styled.div`
  padding-bottom: 5.5rem;
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  padding-top: 100px;
`

const ProfilePic = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 150px;
`

const TopArtistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

export default Profile
