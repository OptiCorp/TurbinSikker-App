import { createGlobalStyle } from 'styled-components'

export const COLORS = {
    white: '#FFF',
    black: '#000',
    gray: '#BEBEBE',
    lightGray: '#dcdcdc',
    primary: '#007079',
    secondary: '#242746',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
}

const GlobalStyles = createGlobalStyle`

body,
  html {
    margin: 0;
    width: 100%;
    font-family: equinor;
    height: 100%;
    font-size: 13px;
  }

  .wrapper {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
  }

  body::-webkit-scrollbar,
  .wrapper::-webkit-scrollbar,
  html::-webkit-scrollbar {
    display: none;
  }
    

`

export default GlobalStyles
