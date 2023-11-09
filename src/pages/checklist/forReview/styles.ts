import { Table } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const BackgroundWrapCompleted = styled.div`
    display: flex;
    height: min(80vh);

    background: ${COLORS.primary};
    align-items: left;
    flex-direction: column;
    padding: 1rem 1rem;

    padding-bottom: 1rem;
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

export const CellContentCompleted = styled.div`
    font-weight: 600;
    -webkit-box-align: center;
    gap: 0.5rem;
    min-height: 50px;
    margin: 10px 0px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`
