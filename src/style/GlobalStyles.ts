import { createGlobalStyle } from 'styled-components'

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
