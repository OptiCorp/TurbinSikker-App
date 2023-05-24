import styled from "styled-components";

export const FooterContainer = styled.div`

min-height: 64px;
  width: 100%;
 position: sticky;
  bottom: 0;
  box-sizing: border-box;
    display: grid;
    column-gap: 24px;
    grid-template-columns: auto 1fr auto;
  background: #243746;
`;

export const Icons = styled.div`
display: flex;
align-items: center;
grid-column: 3/3;

`;

export const Sidemenu = styled.div`

min-height: 80vh;
  width: 100%;
 position: sticky;
  right: 0;
  box-sizing: border-box;
    display: grid;
    column-gap: 24px;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
  background: #243746;
`;