import { Tabs } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const StyledTabh3 = styled.h3`
    height: 10px;
    font-size: 1rem;

    color: white;
`

export const TabWrap = styled.div`
    background: #f5f5f5;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`

export const TabSubmittedWrap = styled.div`
    background: #f5f5f5;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`
export const TabCompletedWrap = styled.div`
    background: #f5f5f5;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`

export const MainWrap = styled.div`
    margin: 1rem auto;

    width: 100%;
`
export const ActiveTab = styled(Tabs.Tab)`
    background-color: #007079;
`
