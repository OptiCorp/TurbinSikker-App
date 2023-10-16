import { Card, Dialog, Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

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
    color: red;

    line-height: 5px;
`

export const StyledDialog = styled(Dialog.CustomContent)`
    padding: 1.5rem;
`

export const BackgroundContainer = styled.div`
    background-color: #f0f3f3;
`

export const ScrollWrapper = styled.div`
    overflow: scroll;
    padding-bottom: 20px;
    margin-bottom: 4rem;
`
export const EditWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 3rem;

    margin: 1rem auto;
    flex-direction: column;
`
export const EditStyledCardHeader = styled(Card.Header)`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`
export const EditCard = styled(Card)`
    background: white;
    margin: 0 auto;
`
export const StyledSwitch = styled(Switch)`
    display: flex;
    flex-direction: row;
    top: 0;
    margin: 0 auto;
`
