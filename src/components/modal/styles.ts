import { Dialog } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const BtnWrap = styled.div`
    display: grid;
    column-gap: 90px;
    grid-template-columns: repeat(2, auto);
    justify-content: end;
    justify-self: end;
`

export const StyledContent = styled(Dialog.CustomContent)`
    display: flex;
    justify-content: center;
    flex-direction: column;
`
