import { createGlobalStyle } from 'styled-components'

export const COLORS = {
    white: '#fff',
    black: '#000',
    primary: '#007079',
    secondary: '#243746',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
}

const GlobalStyles = createGlobalStyle`
    body, html {
        margin: 0;
        width: 100%;
        height: 100%;
        font-family: equinor;
        font-size: 13px;
    }
`

export default GlobalStyles
