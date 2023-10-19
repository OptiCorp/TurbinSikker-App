import { createGlobalStyle } from 'styled-components'

export const SHADOW =
    '0 0.3px 0.9px rgba(33, 41, 43, 0.04), 0 0.9px 3.1px rgba(33, 41, 43, 0.07), 0 4px 14px rgba(33, 41, 43, 0.1)'

export const COLORS = {
    white: '#FFF',
    black: '#000',
    gray: '#BEBEBE',
    lightGray: '#CCC',
    silverGray: '#DCDCDC',
    paleGray: '#EAEAEA',
    frostyGray: '#F0F3F3',
    lightSteelBlue: '#DEEDEE',
    primary: '#007079',
    secondary: '#242746',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
    whiteSmoke: '#f5f5f5',
    activeNavTab: '#73b1b5',
    styledChipColor: '#e60323',
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

  
body::-webkit-scrollbar {
    display: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar {
    display: none;
}

`

export default GlobalStyles
