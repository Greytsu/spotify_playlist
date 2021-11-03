import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import playlist_icon from '../../resources/icons/playlist.svg'
import profile_icon from '../../resources/icons/profile.svg'
import theme_icon from '../../resources/icons/theme.svg'
import Selected from './selected'

const Navigation = props => {
  const history = useHistory()

  return (
    <Navbar className='navbar'>
      <a>
        <NavIcon
          src={theme_icon}
          alt='theme'
          onClick={() => props.themeSwitcher()}
        />
      </a>
      <a>
        <Selected icon_page='playlists'>
          <NavIcon
            src={playlist_icon}
            alt='playlists'
            onClick={() => history.push('/playlists')}
          />
        </Selected>
      </a>
      <a>
        <Selected icon_page='profile'>
          <NavIcon
            src={profile_icon}
            alt='profile'
            onClick={() => history.push('/profile')}
          />
        </Selected>
      </a>
    </Navbar>
  )
}

//Style-------------------------------------------------------------------------

const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.secondary};
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 5rem;
`

const NavIcon = styled.img`
  height: 100%;
`

export default Navigation
