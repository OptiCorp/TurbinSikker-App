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
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    flex-direction: column;
`
export const HeadCell = styled(Table.Cell)`
    width: 300px;
`

export const Styledh3 = styled.h3`
    height: 10px;
    display: inline;
    text-align: center;
    width: 100%;
`

export const MyCheckListCell = styled(Table.Cell)`
    padding-right: 0;
`

export const StyledTableBody = styled(Table.Body)`
    padding-right: 0;
`

export const CellContentMyList = styled.div`
    display: grid;

    margin: 1rem 0;
    grid-row-gap: 10px;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row;
    grid-template-columns: minmax(125px, 1fr);
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
