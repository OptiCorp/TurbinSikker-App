import { Dialog, Table, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const ListWrapperCheckMyList = styled.div`
    background: whitesmoke;
    height: 600px;
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: hidden;
    margin: 10px 0;
    background: #007079;
    padding-bottom: 80px;
    overflow-y: scroll;
`
export const BackgroundWrap = styled.div`
    background: #007079;
    display: flex;

    align-items: left;
    box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    flex-direction: column;
`
export const HeadCell = styled(Table.Cell)`
    width: 300px;
`

export const StyledHeadContents = styled.h3`
    height: 10px;
    display: inline;
    text-align: center;
    width: 100%;
`
export const StyledHeadTitle = styled.h3`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`

export const MyCheckListCell = styled(Table.Cell)`
    padding-inline: 8px;
`

export const StyledTableBody = styled(Table.Body)`
    padding-right: 0;
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

    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50px;
    justify-content: space-around;
    margin: 10px 0;
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
    color: red;
    line-height: 5px;
`
