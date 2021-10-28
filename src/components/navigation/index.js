import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import playlist_icon from '../../resources/icons/playlist.svg'
import profile_icon from '../../resources/icons/profile.svg'
import theme_icon from '../../resources/icons/theme.svg'

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
        <NavIcon
          src={playlist_icon}
          alt='playlists'
          onClick={() => history.push('/playlists')}
        />
      </a>
      <a>
        <NavIcon
          src={profile_icon}
          alt='playlists'
          onClick={() => history.push('/profile')}
        />
      </a>

      {/* 
        <NavLink onClick={() => history.push('/')}>Login</NavLink>
        <NavLink onClick={() => history.push('/playlists')}>Playlists</NavLink>
        <NavLink onClick={() => history.push('/profile')}>Profile</NavLink>
        <NavLink onClick={() => props.themeSwitcher()}>Theme</NavLink> 
      */}
    </Navbar>
  )
}

//Style-------------------------------------------------------------------------

const NavLink = styled.div`
  margin: 12px;
  cursor: pointer;
  width: auto;
  text-align: center;
`

const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.secondary};
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: solid 1px;
  height: 5rem;
`

const NavIcon = styled.img`
  margin: 12px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  height: 80%;
`

export default Navigation
