import { Card } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const TitleHeader = styled.div`
    display: flex;

    margin: 0 auto;
    flex-direction: column;
`

export const FormWrap = styled.form``
export const Container = styled.div`
    margin: 10px auto;
    display: flex;
    height: 100px;
    flex-direction: column;
    align-items: center;
    background-color: #f0f3f3;
`
export const Wrap = styled.div``
export const StyledCardContent = styled(Card.Content)`
    gap: 20px;
    grid-row-gap: 20px;
    display: grid;
    grid-template-columns: minmax(150px, 1fr) minmax(150px, 1fr);
`

export const ControllerWrap = styled.div`
    grid-column: 1/2;
    margin: 0 auto;
`
