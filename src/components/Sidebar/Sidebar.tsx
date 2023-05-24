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
      style={{ height: '100%' , width: '50%', top:'63px', display: 'grid', gridTemplateRows:'repeat(6,1fr)',gridTemplateColumns:'1fr', background:'#243746',
   }} >
     <Container> 
         <img src={Logosidebar}/></Container>
   
   
        
        <Icon data={menu}size={40} color='white' onClick={() => setOpen(!open)}  style={{gridRow:'6/6'}}/>
    </SideSheet>
  </Scrim>
</>

);
}
export default Sidebar