import { Card, Dialog, Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'
export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    align-items: center;
    gap: 50%;
`

export const EditListPoints = styled(TextField)`
    text-align: center;
    padding: 0;
    margin: 0 auto;
    color: ${COLORS.dangerRed};

    line-height: 5px;
`

export const StyledDialog = styled(Dialog.CustomContent)`
    padding: 1.5rem;
`

export const BackgroundContainer = styled.div`
    background-color: ${COLORS.frostyGray};
`

export const ScrollWrapper = styled.div`
    overflow: scroll;
    padding-bottom: 20px;
    margin-bottom: 4rem;
`
export const EditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    width: 70%;
    margin: 0 auto;
`
export const EditStyledCardHeader = styled(Card.Header)`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`
export const EditCard = styled(Card)`
    background: ${COLORS.white};
    margin: 0 auto;
`
export const StyledSwitch = styled(Switch)`
    display: flex;
    flex-direction: row;
    top: 0;
    margin: 0 auto;
`
export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`
export const StyledCard = styled(Card)`
    font-size: 1.5rem;
    background: white;
    margin: 0 auto;
    height: min-content;
    display: flex;
    position: relative;
    text-align: center;
`

export const CategoryName = styled.h3`
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
`
export const ActionHeader = styled.div`
    color: red;
    display: flex;
    flex-direction: row-reverse;
`

export const Delete = styled.div`
    color: red;
    justify-content: flex-end;
    display: flex;
    margin: 0;
`
