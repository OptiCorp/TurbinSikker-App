import styled from 'styled-components'
import { Table } from '@equinor/eds-core-react'
import { Cell } from '@equinor/eds-core-react/dist/types/components/Table/Cell'

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
    line-height: 2rem;
    padding: 0;
    text-align: center;
    min-width: 20vw;

    font-size: 0.7rem;
    right: 1rem;
`

export const StyledHead = styled(Table.Head)``
export const TableData = styled.p`
    word-wrap: break-word;
    font-size: 0.7rem;
    text-overflow: clip;
    width: 200px;
    margin: 0 auto;
`

export const ListWrapper = styled.div`
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
`
