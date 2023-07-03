import { Button, Table, Tabs } from '@equinor/eds-core-react'

import styled from 'styled-components'

export const CellContent = styled.div`
    min-height: 20px;
    font-weight: 600;
    margin: 10px auto;
`

export const ListWrapperCheckL = styled.div`
    margin: 0 auto;
    background: whitesmoke;
    height: 600px;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ListWrapperCheckMyList = styled.div`
    margin: 0 auto;
    background: #007079;
    height: 600px;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledTableCellCheckL = styled(Table.Cell)`
    line-height: 1.5rem;
    padding: 0;
    text-align: center;
    min-width: 30vw;
    max-width: 100px;

    font-size: 0.7rem;
`
export const StyledTabs = styled(Tabs)`
    margin: 0 auto;

    height: 70px;
    padding-bottom: 30px;
    padding-top: 30px;
`
export const StyledTabList = styled(Tabs.List)``
export const StyledTabsTab = styled(Tabs.Tab)`
    background: grey;
`

export const Wrapper = styled.div`
    display: flex;
    overflow: hidden;
    margin: 0 auto;
`

export const Test = styled.div`
    background: #007079;
    width: 100%;
    border-top-right-radius: 10px;

    border-top-left-radius: 10px;
`
export const ContentWrapper = styled.div``

export const StyledTableh3 = styled.h3`
    min-width: 100%;
    margin: 0 auto;
    text-align: center;
`
export const StyledRow = styled(Table.Row)`
    height: 100px;

    gap: 40px;
`
