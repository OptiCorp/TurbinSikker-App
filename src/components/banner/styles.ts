import { Button, Table } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS, SHADOW } from '../../style/GlobalStyles'

export const Wrapper = styled.div`
    width: 100%;

    gap: 1rem;
`

export const Content = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
`

export const BannerContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;

    cursor: pointer;
    border: 2px solid ${COLORS.dangerRed};
    border-radius: 4px;
    box-shadow: ${SHADOW};
    font-size: 12px;
    color: ${COLORS.primary};
`
export const BtnWrap = styled(Button)`
    display: flex;
    max-width: 100%;
    max-height: 2rem;
`
export const TableStyledHead = styled(Table.Cell)`
    margin: 0;
    cursor: pointer;
    background: white;
`
export const StatusBadgeContainer = styled.div`
    top: -15px;
    left: -10px;
    position: absolute;
    display: flex;
    color: ${COLORS.white};
`

export const TableStyledBanner = styled(Table.Row)`
    cursor: pointer;
`
