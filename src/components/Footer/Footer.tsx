import { FooterContainer,Icons } from "./styles"
import { menu } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'


export const Footer = () => {


return (

<><FooterContainer><Icons>  <Icon data={menu}size={40} color='white'  /></Icons> </FooterContainer></>
    
)


}