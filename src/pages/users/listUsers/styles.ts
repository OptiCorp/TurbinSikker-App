import styled from 'styled-components'
import { Table } from '@equinor/eds-core-react'

export const StyledTable = styled(Table)`
    margin: 30px auto;
    width: 100%;

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
    line-height: 2rem;
    padding: 0;

    padding-right: 1rem;
`

export const StyledHead = styled(Table.Head)``

export const TableData = styled.p`
    line-height: 40px;

    font-size: 0.7rem;
`

export const ListWrapper = styled.div`
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
`
