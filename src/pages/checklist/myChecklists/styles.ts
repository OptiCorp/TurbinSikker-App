import { Chip, Dialog, Table, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const BackgroundWrap = styled.div`
    display: flex;
    height: min(70vh);
    align-items: left;
    flex-direction: column;
    padding: 1rem 1rem;
    overflow: auto;

    background: ${COLORS.primary};

    padding-bottom: 4rem;
`

export const StyledTableRow = styled(Table.Row)`
    cursor: pointer;
    &:hover {
        box-shadow: 1px 2px 2px 0px rgba(0, 100, 121);
    }
    &:active {
        transform: scale(0.98);
    }
`

export const CellContentMyList = styled.div`
    font-weight: 600;
    -webkit-box-align: center;
    min-height: 50px;
    margin: 10px 0px;
    width: 100%;
    display: flex;
    align-items: flex-start;

    justify-content: space-evenly;
    flex-direction: column;
`

export const TitleCellContent = styled.div`
    text-wrap: pretty;
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
    align-items: center;

    display: flex;
    justify-content: left;
    align-content: center;
    margin: 0;
`
