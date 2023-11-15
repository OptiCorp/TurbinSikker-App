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
    cursor: pointer;
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
    height: 700px;
    padding-bottom: 20px;
`
export const EditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 70%;
    gap: 3rem;
    margin: 0 auto;
`
export const EditStyledCardHeader = styled(Card.Header)`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`
export const EditCard = styled(Card)`
    background: ${COLORS.white};
    width: 100%;
    margin: 0 auto;
`
export const StyledSwitch = styled(Switch)`
    display: flex;
    flex-direction: row;
    top: 0;
    margin: 0 auto;
`

export const StyledCard = styled(Card)`
    font-size: 1.5rem;
    background: ${COLORS.white};

    margin: 0 auto;
    display: flex;
    position: relative;
    max-width: 800px;
    text-align: center;
`

export const ActionHeader = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

export const Delete = styled.div`
    display: inline-flex;
    align-self: flex-end;
    height: 0;
    cursor: pointer;
    margin: 0;
`
