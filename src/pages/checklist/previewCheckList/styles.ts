import { Card, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const PreviewWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    margin: 1rem auto;
    flex-direction: column;
`

export const InfoHeader = styled.div`
    display: flex;
    width: 100%;
    min-height: 50px;
`
export const PreviewListWrap = styled.ul`
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    width: 70%;
    margin: 0 auto;
`
export const PreviewListPoints = styled(TextField)`
    text-align: center;
    padding: 0;
`

export const StyledCard = styled(Card)`
    font-size: 1.5rem;
    background: white;
    margin: 0 auto;
    text-align: center;
`

export const CategoryName = styled.h3`
    text-align: left;
    font-size: 1rem;

    font-weight: 600;
`

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`

export const EditStyledCardHeader = styled(Card.Header)`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`
export const BackgroundContainer = styled.div`
    background-color: #f0f3f3;
`
