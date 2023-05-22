import styled from "styled-components"
import backgrounddestop from '../../Images/destopwindturbinebackground.png'

import background from '../../Images/Kateraterateru_can_you_make_this_bigger_and_in_better_quality_H_8043e93a-1e91-4653-9725-960aa1454f66.png'


export const LoginContainer = styled.div`
min-width: 220px;
display: grid;
grid-template-columns: min(1fr);

justify-content: center;
grid-template-rows: 1fr 1fr 1fr;
align-items: center;
text-align: center;
margin: 0 auto;
`;





export const BackgroundContainer = styled.div`
background-image: url(${background});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
margin: 0;
display: flex;
width: 100%;
justify-content: center;
align-items: center;
min-height: 100vh;

@media (min-width:1025px) {background-image: url(${backgrounddestop});
background-size: cover;
background-repeat: no-repeat;
background-position: center; }


`;


export const TitleHeader = styled.h1`
 font-family: Equinor;
font-style: italic;
color: white;
text-shadow: 2px 0px 3px rgba(0,0,0,0.5);
  font-weight: 500;
  margin: 0 auto;
  
`;


export const Header = styled.div`



display: flex;
flex-direction: column;
 align-items: center;
gap: 20px;
margin: 0 auto;

`;

export const LinkTextHeader = styled.h3`
 font-family: Equinor;
font-style: italic;
  font-weight: 300;
  margin: 0 auto;
`;


export const Infotext = styled.p`
 font-family: Equinor;
font-style: italic;
max-width: 270px;
line-height: 40px;
text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  font-weight: 500;
  color: white;
  margin:  0 auto;

`;



