import { Chip, Table } from '@equinor/eds-core-react'

import styled from 'styled-components'

export const StyledTableCellCheckL = styled(Table.Cell)`
    padding-bottom: 1rem;
    max-width: 100px;

    word-wrap: break-word;
`

export const StyledChip = styled(Chip)`
    margin: 0 auto;
    line-height: 0;
`

export const CellContent = styled.div`
    font-weight: 600;
    margin: 10px 0;

    display: grid;
    grid-row-gap: 20px;
    justify-items: center;
    grid-template-rows: 1fr auto 0;

    grid-template-columns: minmax(110px, 1fr);
`

export const ListWrapperCheckL = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
    height: 600px;
    padding-bottom: 50px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 10px 0;
`

export const StyledTableh3 = styled.h3`
    height: 10px;
    display: inline;
    text-align: center;
    width: 100%;
`

export const Wrap = styled.div`
    display: flex;

    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    background: #f5f5f5;
    align-items: left;
    flex-direction: column;
`
