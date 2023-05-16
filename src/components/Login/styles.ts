import styled from "styled-components"
import backgrounddestop from '../../Images/original1blur.png'

import background from '../../Images/Kateraterateru_can_you_make_this_bigger_and_in_better_quality_H_8043e93a-1e91-4653-9725-960aa1454f66.png'

export const LoginContainer = styled.div`
min-width: 220px;
font-family: Equinor;
font-style: normal;
  font-weight: 400;
  text-align: center;
margin: 0;



@media (min-width:1025px) {}
`

export const BackgroundContainer = styled.div`
background-image: url(${background});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
margin: 0;

display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;

@media (min-width:1025px) {background-image: url(${backgrounddestop});
background-size: cover;

background-repeat: no-repeat;
background-position: center; }
`;

export const Title = styled.h1`
`;