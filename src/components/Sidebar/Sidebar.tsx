import { Icon, Scrim, SideSheet } from '@equinor/eds-core-react'
import { menu } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import {Container } from './styles';
import Logosidebar from '../../Images/Frame 964.png'


export interface Props {
	open:boolean,
setOpen:(open:boolean)=>void
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen }) =>  {

    


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
   
   
        
        <Icon data={menu}size={40} color='#73B1B5'  onClick={() => setOpen(!open)}  style={{gridRow:'7/7' }}/>
    </SideSheet>
  </Scrim>
</>

);
}
export default Sidebar