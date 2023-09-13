import { TopBar } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const NewTopBar = styled(TopBar)`
    background: #243746;
    display: grid;
    width: max(100vw vw);
    justify-items: center;

    grid-template-columns: auto 1fr auto;
`

export const HeaderContents = styled.div``

export const HeaderLocation = styled.p`
    margin: 0;
    color: white;

    font-size: 1rem;
`
