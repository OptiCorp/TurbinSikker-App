import styled from "styled-components"
import backgrounddestop from '../../Images/destopwindturbinebackground.png'
import background from '../../Images/Kateraterateru_can_you_make_this_bigger_and_in_better_quality_H_8043e93a-1e91-4653-9725-960aa1454f66.png'


export const LoginContainer = styled.div`

display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr auto 1fr;
align-items: center;
background-color: rgb(35 54 69 / 0.1);
backdrop-filter: blur(5px);
height: 100vh;
width: 100%;
text-align: center;

`;
export const ButtonWrapper = styled.div`
width: 50%;
min-width: 300px;
margin: 0 auto;

`;



export const BackgroundContainer = styled.div`
background-image: url(${background});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;

@media (min-width:1025px) {background-image: url(${backgrounddestop});
background-size: cover;
background-position: center; }


`;


export const TitleHeader = styled.h1`

font-style: italic;
color: white;
text-shadow: 2px 0px 3px rgba(0,0,0,0.5);
  font-weight: 500;
  margin: 0 auto;

`;


export const Header = styled.div`
text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
display: flex;
flex-direction: column;
 align-items: center;
gap: 20px;
`;


export const Infotext = styled.p`

font-style: italic;
max-width: 270px;
line-height: 60px;
text-shadow: 2px 1px 1px rgba(0,0,0,0.5);
  font-weight: 600;
  color: white;
  margin:  0 auto;

`;



