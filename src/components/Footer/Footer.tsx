import { FooterContainer,Icons, Sidemenu } from "./styles"
import { menu } from '@equinor/eds-icons'
import Sidebar from "../Sidebar/Sidebar"
import { Icon, SideBar } from '@equinor/eds-core-react'
import { useState } from "react"


export const Footer = () => {

    const [open, setOpen] = useState(false)
return (

<>
<Sidebar open={open} setOpen={setOpen}/> 
<FooterContainer><Icons>  <Icon data={menu}size={40} color='white' onClick={() => setOpen(!open)} /></Icons>

</FooterContainer>


</>
    
)


}