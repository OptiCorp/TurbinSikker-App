import { Card, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const InfoHeader = styled.div`
    display: flex;
    width: 100%;
    min-height: 50px;
`
export const PreviewListWrap = styled.ul`
    margin: 0 auto;
    margin-bottom: 5rem;
    display: grid;
    grid-template-rows: 1fr;
    padding: 2rem;
    grid-template-columns: 1fr;
    width: 40%;
    min-width: 300px;
    min-height: 100px;
`
export const PreviewListPoints = styled(TextField)`
    text-align: center;
    padding: 0;
`

export const TitleH1 = styled.h1`
    text-align: left;
    width: 0;
    font-size: 1.2rem;
    height: 0px;
`

export const StyledCard = styled(Card)`
    font-size: 1.5rem;
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
