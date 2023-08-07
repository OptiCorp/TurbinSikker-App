import { Card } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const TitleHeader = styled.div`
    display: flex;

    margin: 0 auto;
    flex-direction: column;
`

export const ControllerWrap = styled.div`
    grid-column: 1/2;
    margin: 0 auto;
`

export const StyledCard = styled(Card)`
    width: 100%;
    padding: 1rem;
`
