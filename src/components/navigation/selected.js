import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Selected = props => {
  const result =
    useSelector(state => state.activePage.value) === props.icon_page ? 0 : 1

  return useSelector(state => state.activePage.value) === props.icon_page ? (
    <Container>{props.children}</Container>
  ) : (
    <Active>{props.children}</Active>
  )
}

const Container = styled.div`
  filter: grayscale(${0});
  height: 5rem;
  margin: 0;
`

const Active = styled.div`
  filter: grayscale(${1});
  height: 5rem;
  margin: 0;
`

export default Selected
