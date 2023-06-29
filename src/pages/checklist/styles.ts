import { Table } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const CellContent = styled.div`
    min-height: 20px;
    font-weight: 600;
    margin: 10px auto;
`

export const ListWrapperCheckL = styled.div`
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

export const StyledTableCellCheckL = styled(Table.Cell)`
    line-height: 1.5rem;
    padding: 0;
    text-align: center;
    min-width: 10vw;
    max-width: 100px;

    font-size: 0.7rem;
`
