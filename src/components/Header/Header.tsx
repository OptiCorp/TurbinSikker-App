import { TopBar } from '@equinor/eds-core-react'

import React from 'react'
import logo from '../../assets/images/smallLogo.png'
import styled from 'styled-components'


const NewTopBar = styled(TopBar)`
 background: #243746;
`;




export const Header = () => {



return (

    <NewTopBar>
    <TopBar.Header>
   
    <React.Fragment key=".0">
   
      </React.Fragment>
    </TopBar.Header>
  
    <TopBar.Actions>

         <img src={logo}/>
        
     
    </TopBar.Actions>
  </NewTopBar>

)



}