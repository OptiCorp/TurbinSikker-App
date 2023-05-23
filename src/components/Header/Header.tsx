import { TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import React from 'react'
import logo from '../../Images/Kateraterateru_minimalistic_logo_for_wind_turbine_satety_inspec_45e7a62e-42d4-40f9-806a-569fac927b49 1.png'
import styled from 'styled-components'
import {useNavigate} from 'react-router'


const NewTopBar = styled(TopBar)`
 background: #243746;
`;




export const Header = () => {


    
    const navigate = useNavigate();

    const onClick = () => {navigate('/')}
return (

    <NewTopBar>
    <TopBar.Header>
   
    <React.Fragment key=".0">
        <Icon data={arrow_back_ios} color='white' onClick={onClick}> </Icon>
 
      </React.Fragment>
    </TopBar.Header>
  
    <TopBar.Actions>

         <img src={logo}/>
        
     
    </TopBar.Actions>
  </NewTopBar>

)



}