import styled from 'styled-components'
import { Table } from '@equinor/eds-core-react'

export const StyledTable = styled(Table)`
    margin: 0;
    padding-top: 30px;
`

export const ContainerForm = styled.div`
    margin: 0;
    height: 60vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const StyledTableCell = styled(Table.Cell)`
    padding: 0;
    line-height: 1.5rem;
    text-align: center;
    min-width: 10vw;
    max-width: 100px;
    font-size: 0.7rem;
`

export const CellSize = styled.div`
    width: 200px;
`

export const TableData = styled.p`
    margin: 0;
    padding: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    width: 100%;
    font-size: 0.6rem;
`

export const ListWrapper = styled.div`
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`
