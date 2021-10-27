import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Loader from '../components/loader'
import { useHistory } from 'react-router'

const PLAYLISTS_ME_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'

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
        setPlaylists({})
        setError(true)
        setIsLoading(false)
        console.log(err)
      })
  }

  const handleClick = id => {
    history.push(`/playlistsDetails/${id}`)
  }

  //TODO: if data error return error

  if (error) {
    return <p>test error</p>
  }

  return (
    <div>
      <h2>Playlists</h2>
      {isLoading ? (
        <Loader />
      ) : (
        playlists.map(playlist => {
          return (
            <PlaylistContainer onClick={() => handleClick(playlist.id)}>
              <PlaylistThumbnail src={playlist.images[0]?.url} />
              <PlaylistDetails>
                <PlaylistTitle>{playlist.name}</PlaylistTitle>
                <PlaylistOwner>{playlist.owner.display_name}</PlaylistOwner>
              </PlaylistDetails>
            </PlaylistContainer>
          )
        })
      )}
    </div>
  )
}

//Style-------------------------------------------------------------------------

const PlaylistContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
  border-radius: 25px;
  height: 5rem;
`

const PlaylistThumbnail = styled.img`
  height: auto;
  width: 5rem;
  object-fit: cover;
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
