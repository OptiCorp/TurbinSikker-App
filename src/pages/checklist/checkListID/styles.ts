import { Table } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const ListWrapperCheckMyList = styled.div`
    background: whitesmoke;
    height: 600px;
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: hidden;
    margin: 10px 0;
    background: #007079;
    padding-bottom: 80px;
    overflow-y: scroll;
`
export const BackgroundWrap = styled.div`
    background: #007079;
    display: flex;

    align-items: left;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    flex-direction: column;
`
export const HeadCell = styled(Table.Cell)`
    width: 300px;
`

export const Styledh3 = styled.h3`
    height: 10px;
    display: inline;
    text-align: center;
    width: 100%;
`

export const MyCheckListCell = styled(Table.Cell)`
    padding-right: 0;
`

export const Test = styled.div`
    display: grid;

    margin: 1rem 0;
    grid-gap: 15px;
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 1fr;
`

export const CellContentMyList = styled.div`
    display: grid;
    margin: 1rem 0;
    grid-gap: 10px;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row;
    grid-template-columns: minmax(125px, 1fr);
`
