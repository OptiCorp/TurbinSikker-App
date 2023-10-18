import { getStatusBackgroundColor } from '../../../helpers/statusBackgroundHelper'
import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const PunchListItem = styled.div`
    background-color: ${COLORS.frostyGray};
    padding: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 80px;
`

export const PunchListBoxContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0px 4px 4px 2px ${COLORS.gray};
    font-size: 12px;
    color: ${COLORS.primary};
    background-color: ${COLORS.white};
`
export const TicketInfo = styled.div`
    display: flex;
    align-items: center;
`

export const TicketSeverityContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 0.7px solid ${COLORS.silverGray};
    padding-right: 18px;
`

export const TicketDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TicketActions = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: start;
`

export const TicketIcons = styled.div`
    display: flex;
    justify-content: right;
`

export const TicketButtonContainer = styled.div`
    display: flex;
    align-items: center;
`

export const CreatedByContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    background: ${COLORS.silverGray};
    color: ${COLORS.black};
    box-shadow: 1px 1px 0px 0px ${COLORS.gray} inset;
`

export const StatusBadgeContainer = styled.div`
    position: absolute;
    top: -15px;
    left: -10px;
    display: flex;
    color: ${COLORS.white};
`

export const StatusBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 4;
    padding: 5px;
    border-radius: 4px;
    background: ${(props: { status: string }) => getStatusBackgroundColor(props.status)};
`
export const TicketCardDescription = styled.p`
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${COLORS.gray};
`
