import React, { useState } from 'react'
import styled from 'styled-components'
import SpotifyLogo from '../components/logo'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <LoginContainer>
        <SpotifyLogo />
        <p>Spotify Logo</p>
        <input
          id='login'
          name='login'
          required
          maxLength='50'
          size='25'
          placeholder='Login'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type='password'
          id='password'
          name='password'
          required
          maxLength='50'
          size='25'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d7e3d7;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 90vw;
  border-radius: 25px;
`

export default Login
