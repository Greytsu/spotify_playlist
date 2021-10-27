// globalStyles.js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.font_primary};
  }
`

export default GlobalStyle
