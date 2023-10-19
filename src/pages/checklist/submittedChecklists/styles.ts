import { Chip, Table } from '@equinor/eds-core-react'

import styled from 'styled-components'

export const StyledTableCellCheckL = styled(Table.Cell)`
    padding-inline: 8px;
`

export const StyledChip = styled(Chip)`
    min-width: 120px;

    display: flex;
    justify-content: left;
    align-content: center;
    margin: 0 auto;
`

export const CellContent = styled.div`
    font-weight: 600;

    display: flex;
    flex-direction: column;
    align-items: left;
    min-height: 50px;
    width: 100px;
    justify-content: space-around;
    margin: 10px 0;
`

export const StyledBodyTitle = styled.div`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`

export const ListWrapperCheckL = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
    height: 600px;
    padding-bottom: 50px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 10px 0;
    width: 100vw;
`

export const StyledHeadContents = styled.h3`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`

export const StyledHeadTitle = styled.h3`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`

export const Wrap = styled.div`
    display: flex;

    box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    background: #007079;
    align-items: left;
    flex-direction: column;
`
