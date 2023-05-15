import styled from "styled-components"
import backgrounddestop from '../../Images/original.png'
import background from '../../Images/Kateraterateru_can_you_make_this_bigger_and_in_better_quality_H_8043e93a-1e91-4653-9725-960aa1454f66.png'
export const LoginContainer = styled.div`
min-width: 320px;
min-height: 500px;
margin: 0;
filter: blur(5px);
@media (min-width:1025px) {}
`

export const BackgroundContainer = styled.div`
background-image: url(${background});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
margin: 0;
min-height: 100vh;

@media (min-width:1025px) {background-image: url(${backgrounddestop});
background-size: cover;

background-repeat: no-repeat;
background-position: center; }
`;