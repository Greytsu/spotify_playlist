import React from 'react'
import styled from 'styled-components'

const Artist = props => {
  return (
    <Container>
      <ArtistPic src={props.artist.images[0]?.url} />
      <ArtistDetails>
        <ArtistName>{props.artist.name}</ArtistName>
        <ArtistFollowers>
          {props.artist.followers.total} followers
        </ArtistFollowers>
      </ArtistDetails>
    </Container>
  )
}

//Style--------------------------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
  border-radius: 25px;
  height: 5rem;
  width: 100%;
  align-items: center;
`

const ArtistPic = styled.img`
  height: 4.5rem;
  width: 4.5rem;
  object-fit: cover;
  border-radius: 25px;
  padding-left: 0.25rem;
`
const ArtistDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const ArtistName = styled.p`
  font-size: 1em;
  margin: 0;
`
const ArtistFollowers = styled.p`
  font-size: 1em;
  font-weight: lighter;
  color: ${props => props.theme.font_secondary};
  margin: 0;
`

export default Artist
