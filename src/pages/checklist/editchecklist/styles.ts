import { Dialog, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
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
    min-height: 150px;
    padding: 1.5rem;
`
