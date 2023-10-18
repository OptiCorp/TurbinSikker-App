import { Table } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'
export const ListWrapperCompletedList = styled.div`
    background:  ${COLORS.whiteSmoke};
    height: 600px;
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: hidden;
    margin: 10px 0;
    background:  ${COLORS.primary};
    padding-bottom: 80px;
    overflow-y: scroll;
`

export const BackgroundWrapCompleted = styled.div`
    background:  ${COLORS.primary};;
    display: flex;

    align-items: left;
    box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    flex-direction: column;
`

export const StyledHeadContentsCompleted = styled.h3`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`
export const StyledHeadTitleCompleted = styled.h3`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`

export const HeadCellCompleted = styled(Table.Cell)`
    width: 300px;
`

export const StyledTableRowCompleted = styled(Table.Row)`
    cursor: pointer;
    &:hover {
        box-shadow: 1px 2px 2px 0px rgba(0, 100, 121);
    }
    &:active {
        transform: scale(0.98);
    }
`

export const CompletedCell = styled(Table.Cell)`
    padding-inline: 8px;
`

export const CellContentCompleted = styled.div`
    font-weight: 600;

    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50px;
    justify-content: space-around;
    margin: 10px 0;
`
export const StyledBodyTitleCompleted = styled.div`
    height: 10px;
    display: inline;
    text-align: left;
    width: 100%;
`
