import { TopBar } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'
export const NewTopBar = styled(TopBar)`
    background: #243746;
    display: grid;
    width: 100vw;
    justify-items: center;

    grid-template-columns: auto 1fr auto;
`

export const HeaderContents = styled.div``

export const HeaderLocation = styled.p`
    margin: 0;
    color: ${COLORS.white};
    font-size: 1rem;
`
