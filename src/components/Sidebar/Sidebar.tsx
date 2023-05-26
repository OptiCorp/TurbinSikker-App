import { Button, Icon, Scrim, SideSheet } from '@equinor/eds-core-react'
import { menu } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import {Container,LinkContainer,RouteName } from './styles'
import Logosidebar from'../../assets/images/bigLogo.png'

import { useMsal } from "@azure/msal-react";

export interface Props {
	open:boolean,
setOpen:(open:boolean)=>void
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen }) =>  {
  const { instance } = useMsal();
  const onSubmit = () => {
 
    instance.logoutPopup()
 
  }


return ( <> <Scrim
    open={open}
    onClose={() => setOpen(!open)}
    isDismissable
    
    style={{ position: 'absolute',  overflow:'hidden' }}
  >
    <SideSheet
      open={open}
      
      onClose={() => setOpen(!open)}
      style={{ height: '100%' , width: '40%', top:'63px',  display: 'grid', gridTemplateRows:'repeat(7,1fr)',gridTemplateColumns:'1fr', background:'#243746',
   }} >
     <Container> 
         <img src={Logosidebar}/></Container>
      <LinkContainer> <Button fullWidth variant="ghost"   ><RouteName>Profile</RouteName></Button>
      <Button fullWidth variant="ghost"   ><RouteName>Users</RouteName></Button>
      <Button fullWidth variant="ghost"   onClick={onSubmit}  ><RouteName>Sign Out</RouteName></Button>
      
      </LinkContainer>
        
        
        <Icon data={menu}size={40} color='#73B1B5'  onClick={() => setOpen(!open)}  style={{gridRow:'7/7' }}/>
    </SideSheet>
  </Scrim>
</>

);
}
export default Sidebar