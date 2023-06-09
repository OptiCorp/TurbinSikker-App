import styled from 'styled-components'
import punch from '../../assets/images/punch.png'
import activepunch from '../../assets/images/activepunch.png'
export const FooterContainer = styled.div`
    min-height: 64px;
    width: 100%;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    background: #243746;
`

export const Sidemenu = styled.div`
    min-height: 80vh;
    width: 100%;
    position: sticky;
    right: 0;
    box-sizing: border-box;
    display: grid;
    column-gap: 24px;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    background: #243746;
`

export const ImageContainer = styled.div`
    background-image: url(${punch});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
    min-width: 100%;
`

export const ImageContainerActive = styled.div`
    background-image: url(${activepunch});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
    min-width: 100%;
`
