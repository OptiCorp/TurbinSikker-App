import { Chip, Dialog, Table, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'
export const ListWrapperCheckMyList = styled.div`
    background: whitesmoke;
    height: 600px;
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: hidden;
    margin: 10px 0;
    background: ${COLORS.primary};
    padding-bottom: 80px;
    overflow-y: scroll;
`
export const BackgroundWrap = styled.div`
    background: ${COLORS.primary};
    display: flex;

    align-items: left;
    box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    flex-direction: column;
`

export const StyledTable = styled(Table)`
    width: 90%;

    margin: 0 auto;
`

export const HeadCell = styled(Table.Cell)``

export const StyledHeadContents = styled.h3``
export const StyledHeadTitle = styled.h3``

export const MyCheckListCell = styled(Table.Cell)`
    align-items: center;
`

export const StyledTableBody = styled(Table.Body)``

export const StyledTableRow = styled(Table.Row)`
    cursor: pointer;
    &:hover {
        box-shadow: 1px 2px 2px 0px rgba(0, 100, 121);
    }
    &:active {
        transform: scale(0.98);
    }
`
//sent
export const CellContentMyList = styled.div`
    font-weight: 600;
    display: flex;

    min-height: 50px;

    margin: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
`
export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50%;
`
export const StyledDialog = styled(Dialog.CustomContent)`
    min-height: 60px;
    padding: 1.5rem;
`
export const MakeTitleField = styled(TextField)`
    text-align: center;
    padding: 0;
    margin: 0 auto;
    color: ${COLORS.dangerRed};
    line-height: 5px;
`

export const StyledChip = styled(Chip)`
    min-width: 100px;
    display: flex;
    margin: 0;
    justify-content: center;
    align-content: center;
`
