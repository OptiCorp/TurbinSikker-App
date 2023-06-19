import styled from 'styled-components'
import { TopBar } from '@equinor/eds-core-react'

export const NewTopBar = styled(TopBar)`
    background: #243746;
    grid-template-columns: 1fr 1fr auto;
    grid-template-areas: 'left center right';
`

export const HeaderContents = styled.div``

export const HeaderLocation = styled.p`
    margin: 0;
    color: white;

    font-size: 1rem;
`
