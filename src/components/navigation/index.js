import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = props => {
  const history = useHistory()
  return (
    <Navbar className='navbar'>
      <NavLink onClick={() => history.push('/login')}>LOGIN</NavLink>
      <NavLink onClick={() => history.push('/playlists')}>Playlists</NavLink>
      <NavLink onClick={() => history.push('/profile')}>Profile</NavLink>
      <NavLink onClick={() => props.themeSwitcher()}>Theme</NavLink>
    </Navbar>
  )
}

const NavLink = styled.div`
  margin: 12px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`

const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: solid 1px;
`

export default Navigation
