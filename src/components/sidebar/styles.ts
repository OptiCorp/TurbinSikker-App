import { SideSheet } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'
export const Container = styled.div`
    grid-row: 1/1;
    max-width: 100px;
`

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: space-between;
    gap: 120px;
    width: 100%;
    margin: 0 auto;
`

export const RouteName = styled.h3`
    color: white;
    text-align: center;
    width: 100%;
`
export const StyledSheet = styled(SideSheet)`
    height: 100%;
    max-width: 40%;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-template-columns: 1fr;
    align-items: center;
    background: ${COLORS.secondary};
    top: 63px;
`
