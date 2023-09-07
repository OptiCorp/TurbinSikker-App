import { Button, Icon, Typography } from '@equinor/eds-core-react'
import {
    arrow_forward_ios,
    assignment_user,
    file_description,
    image,
} from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { formatDate } from '../../../Helpers'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { punchSeverity } from '../Punch'
import { usePunchContext } from '../context/PunchContextProvider'
import {
    PunchListBoxContainer,
    PunchListItem,
    TicketActions,
    TicketButtonContainer,
    TicketDetails,
    TicketIcons,
    TicketInfo,
    TicketSeverityContainer,
} from '../styles'

function ListPunches() {
    const { hasPermission } = useHasPermission()
    const { Punches } = usePunchContext()

    Punches?.sort((a, b) => {
        const dateA = new Date(a.createdDate)
        const dateB = new Date(b.createdDate)

        return dateB.valueOf() - dateA.valueOf()
    })

    return (
        <PunchListItem>
            {Punches?.map((punch, idx) => (
                <PunchListBoxContainer key={idx}>
                    <TicketInfo>
                        <TicketSeverityContainer>
                            {punchSeverity.map((severityItem, idx) => {
                                if (punch.severity === severityItem.severity) {
                                    return (
                                        <Icon
                                            key={idx}
                                            data={severityItem.icon}
                                            size={40}
                                            style={{
                                                color: severityItem.color,
                                            }}
                                        />
                                    )
                                }
                            })}

                            {/* Change when endpoint gives string instead of number */}
                            <Typography>
                                {punch?.severity === 0
                                    ? 'Minor'
                                    : punch.severity === 1
                                    ? 'Major'
                                    : 'Critical'}
                            </Typography>
                        </TicketSeverityContainer>
                        <TicketDetails>
                            <Typography>
                                Ticket-{punch?.id.split('-')[0]}
                            </Typography>
                            <Typography color="disabled">
                                {`${punch.checklistTask.category.name} ${
                                    punch.checklistTask.category.id.split(
                                        '-'
                                    )[0]
                                }`}
                            </Typography>
                            {hasPermission && (
                                <>
                                    <Typography>Created By:</Typography>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            background: '#C5C5C594',
                                            color: '#000',
                                            boxShadow:
                                                '1px 1px 0px 0px #9d9d9d inset',
                                        }}
                                    >
                                        <Icon
                                            size={18}
                                            data={assignment_user}
                                        />
                                        {punch.createdByUser.firstName}
                                    </div>
                                </>
                            )}
                        </TicketDetails>
                    </TicketInfo>

                    <TicketActions>
                        <Typography
                            style={{ textAlign: 'right' }}
                            color="disabled"
                        >
                            {formatDate(punch.createdDate)}
                        </Typography>
                        <TicketIcons>
                            <Icon data={image} />
                            <Icon data={file_description} />
                        </TicketIcons>
                        <TicketButtonContainer>
                            <Button
                                style={{ padding: '0' }}
                                variant="ghost"
                                color="primary"
                            >
                                See Details
                            </Button>
                            <Icon size={16} data={arrow_forward_ios} />
                        </TicketButtonContainer>
                    </TicketActions>
                </PunchListBoxContainer>
            ))}
        </PunchListItem>
    )
}

export default ListPunches
