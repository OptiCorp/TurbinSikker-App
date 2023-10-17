import { Card, Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import NA from '../../assets/images/notApplicable.png'

export const NotApplicableWrap = styled.div`
    display: flex;
    flex-direction: column;

    margin: 50px auto;
    width: 50px;
`

export const ImageContainer = styled.div`
    background-image: url(${NA});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 50px;
    width: 30px;
    margin: 0 auto;
`

export const CustomCard = styled(Card)`
    font-size: 1.5rem;

    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 30px 10px;
    row-gap: 2rem;

    margin: 0 auto;
`

export const CustomCardContent = styled(Card.Content)`
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;

    width: 93%;
    margin: 0 auto;
`

export const CustomCategoryName = styled.h3`
    min-width: 220px;
`

export const CustomTaskField = styled(TextField)`
    & textarea {
        width: 180px;
        padding: 0;
        padding-left: 10px;
    }
`

export const StyledSwitch = styled(Switch)`
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto;
    align-items: baseline;
    & label {
        height: 0;
    }
    max-height: 0px !important;
`

export const FillOutWrap = styled.ul`
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;

    padding: 0;
    gap: 1rem;
    width: 40%;
    min-width: 300px;

    padding-bottom: 1rem;
`
export const Test = styled.div`
    display: grid;
    grid-template-columns: 30px;
    font-size: 1rem;
    margin: 0px auto;
    justify-items: end;
`
