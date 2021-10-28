import React from 'react'
import styled from 'styled-components'

const Track = props => {
  return (
    <Container>
      <Cover src={props.track.album?.images[0]?.url} />
      <Details>
        <SongName>{props.track.name}</SongName>
        <Artist>{props.track.artists[0].name}</Artist>
      </Details>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.secondary};
  margin-top: 10px;
  height: 4rem;
`

const Cover = styled.img`
  height: 4rem;
  width: 4rem;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  height: 4rem;
  justify-content: space-around;
  margin-left: 10px;
`
const SongName = styled.p`
  font-size: 1.3em;
  margin: 0;
`
const Artist = styled.p`
  font-size: 1em;
  font-weight: lighter;
  margin: 0;
`

export default Track
