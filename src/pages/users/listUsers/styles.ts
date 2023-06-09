import styled from 'styled-components'
import { Table } from '@equinor/eds-core-react'

export const StyledTable = styled(Table)`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: left;

    padding-top: 2rem;

    padding-bottom: 2rem;
`

export const Test = styled(Table.Cell)`
    width: 100%;
    line-height: 2rem;
    padding: 0;
    height: 10px;
`

export const StyledHead = styled(Table.Head)`
    width: 100%;
`

export const TableData = styled.p`
    line-height: 40px;
`

export const ListWrapper = styled.div`
    margin: 1rem;
`
