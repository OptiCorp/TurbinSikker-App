import { Card, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #f0f3f3;
`
export const InfoHeader = styled.div`
    margin: 0 auto;
    display: flex;
    width: 100%;
    min-height: 50px;
`
export const PreviewListWrap = styled.ul`
    margin: 0 auto;
    list-style: none;
    display: grid;
    gap: 15px;
    grid-auto-rows: 1fr;

    overflow-y: scroll;
    justify-items: center;
    padding: 2rem;
    grid-template-columns: 1fr;
    height: 60vh;
    width: 80vw;
`
export const PreviewListPoints = styled(TextField)`
    text-align: center;
    padding: 0;

    letter-spacing: 0;
`

export const TitleH1 = styled.h1`
    text-align: left;
    width: 0;
    font-size: 1.2rem;
    margin: 0 auto;

    height: 0px;
`

export const StyledCard = styled(Card)`
    margin: 0 auto;
    font-size: 1.5rem;
    text-align: center;
`
