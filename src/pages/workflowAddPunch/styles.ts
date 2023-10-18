import { Card, Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import NA from '../../assets/images/notApplicable.png'
import { COLORS } from '../../style/GlobalStyles'
export const NotApplicableWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    width: 50px;
`
export const BackgroundWrap = styled.div`
    background-color: ${COLORS.frostyGray};
`

export const Error = styled.div`
    font-size: 1rem;
    font-weight: 600;
    align-self: end;
    color: ${COLORS.dangerRed};
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
    grid-template-rows: 30px 20px 30px;
    row-gap: 2rem;
    padding-bottom: 1rem;
    margin: 0 auto;
`

export const CustomCardContent = styled(Card.Content)`
    font-size: 1.5rem;
    display: flex;
    width: 93%;
    margin: 0 auto;
    align-items: baseline;
`

export const SubmitErrorContainer = styled.div`
    margin: 0;
    color: ${COLORS.dangerRed};
    min-width: 60px;
    display: flex;
    flex-direction: row-reverse;
    align-items: baseline;
    justify-self: end;
`

export const CustomCategoryName = styled.h3`
    min-width: 220px;
    font-size: 1.2rem;
`

export const CustomTaskField = styled(TextField)`
    & textarea {
        padding: 0;
        min-width: 150px;

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
