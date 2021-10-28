import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Loader from '../components/loader'
import { useHistory } from 'react-router'

const Playlists = props => {
  const [token, setToken] = useState(
    localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : ''
  )
  const [playlists, setPlaylists] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const history = useHistory()
  const PLAYLISTS_ME_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
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
      getPlaylists()
    }
  }, [token])

  //Playlists
  useEffect(() => {
    console.log('Playlists', playlists)
    if (playlists.length > 0) {
      setIsLoading(false)
    }
  }, [playlists])

  //Get playlist HTTP call
  const getPlaylists = () => {
    axios
      .get(PLAYLISTS_ME_ENDPOINT, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        console.log('GET', response.data.items)
        setPlaylists([...response.data.items])
      })
      .catch(err => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })
  }

  const handleClick = id => {
    history.push(`/playlistsDetails/${id}`)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div>
        <p>Error</p>
        <button onClick={getPlaylists()}>Réessayer</button>
        <button onClick={disconnect()}>Se reconnecter</button>
      </div>
    )
  }

  return (
    <PlaylistsContainer>
      <Title>Playlists</Title>
      {playlists.map(playlist => {
        return (
          <PlaylistContainer onClick={() => handleClick(playlist.id)}>
            <PlaylistThumbnail src={playlist.images[0]?.url} />
            <PlaylistDetails>
              <PlaylistTitle>{playlist.name}</PlaylistTitle>
              <PlaylistOwner>{playlist.owner.display_name}</PlaylistOwner>
            </PlaylistDetails>
          </PlaylistContainer>
        )
      })}
    </PlaylistsContainer>
  )
}

//Style-------------------------------------------------------------------------

const Title = styled.h2`
  margin: 10;
`

const PlaylistsContainer = styled.div`
  padding-bottom: 5.5rem;
`

const PlaylistContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
  border-radius: 25px;
  height: 5rem;
  align-items: center;
`

const PlaylistThumbnail = styled.img`
  height: 4.5rem;
  width: 4.5rem;
  object-fit: cover;
  border-radius: 25px;
  padding-left: 0.25rem;
`

const PlaylistDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  height: 5rem;
  width: 100%;
`

const PlaylistTitle = styled.p`
  font_size: 5em;
  font-weight: bold;
  margin: 0;
`

const PlaylistOwner = styled.p`
  font_size: 2em;
  margin: 0;
  color: ${props => props.theme.font_secondary};
`

export default Playlists
