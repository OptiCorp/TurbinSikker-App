import styled from 'styled-components'
import { Table } from '@equinor/eds-core-react'

export const StyledTable = styled(Table)`
    margin: 30px auto;
    padding-top: 2rem;
    padding: 0.5rem;
    padding-bottom: 2rem;
`

export const ContainerForm = styled.div`
    height: 60vh;
    margin: 0;

    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const StyledTableCell = styled(Table.Cell)`
    line-height: 1.5rem;
    padding: 0;
    text-align: center;
    min-width: 10vw;
    max-width: 100px;
    font-size: 0.7rem;
`

export const CellSize = styled.div`
    width: 200px;
`

export const TableData = styled.p`
    padding: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    width: 100%;

    font-size: 0.6rem;

    margin: 0;
`

export const ListWrapper = styled.div`
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
`
