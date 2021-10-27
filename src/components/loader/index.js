import React from 'react'
import './style.css'
import styled from 'styled-components'

const Loader = () => {
  return (
    <Container>
      <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
`

export default Loader
