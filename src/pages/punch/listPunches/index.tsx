import { Button, Icon, Typography } from '@equinor/eds-core-react'
import {
    arrow_forward_ios,
    assignment_user,
    file_description,
    image,
} from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { formatDate } from '../../../Helpers'
import { API_URL } from '../../../config'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'
import { punchSeverity } from '../Punch'
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
import { PunchEntity } from '../types'
function ListPunches() {
    const [punch, setPunch] = useState<PunchEntity>()
    const createdDate = punch && formatDate(punch?.createdDate)
    const { hasPermission } = useHasPermission()

    async function getPunch() {
        const response = await fetch(
            `${API_URL}/GetPunch?id=708d8442-415f-4db0-8693-ec712d591cda `
        )
        const data = await response.json()
        setPunch(data)
    }

    const allPunches = new Array(20).fill(punch)

    useEffect(() => {
        getPunch()
    }, [])

    return (
        <PunchListItem>
            {punch &&
                allPunches.map((punch, idx) => (
                    <PunchListBoxContainer key={idx}>
                        <TicketInfo>
                            <TicketSeverityContainer>
                                {punchSeverity.map((severityItem, idx) => {
                                    if (
                                        punch.severity === severityItem.severity
                                    ) {
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
                                <Typography>{punch?.severity}</Typography>
                            </TicketSeverityContainer>
                            <TicketDetails>
                                <Typography>
                                    Ticket-{punch?.id.split('-')[0]}
                                </Typography>
                                <Typography color="disabled">
                                    Fire rf33122
                                </Typography>
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
                                    <Icon size={18} data={assignment_user} />
                                    {hasPermission && punch.user.firstName}
                                </div>
                            </TicketDetails>
                        </TicketInfo>

                        <TicketActions>
                            <Typography
                                style={{ textAlign: 'right' }}
                                color="disabled"
                            >
                                {createdDate}
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

        /* 
        <PunchListItem>
            <PunchListBoxContainer>
                <TicketInfo>
                    <TicketSeverityContainer>
                        <Icon size={40} data={warning_filled} />
                        <Typography>{punch?.severity}</Typography>
                    </TicketSeverityContainer>
                    <TicketDetails>
                        <Typography>
                            Ticket-{punch?.id.split('-')[0]}
                        </Typography>
                        <Typography color="disabled">Fire rf33122</Typography>
                    </TicketDetails>
                </TicketInfo>

                <TicketActions>
                    <Typography style={{ textAlign: 'right' }} color="disabled">
                        {createdDate}
                    </Typography>
                    <TicketIcons>
                        <Icon data={image} />
                        <Icon data={file_description} />
                    </TicketIcons>
                    <TicketButtonContainer>
                        <Button variant="ghost" color="primary">
                            See Details
                        </Button>
                        <Icon size={16} data={arrow_forward_ios} />
                    </TicketButtonContainer>
                </TicketActions>
            </PunchListBoxContainer>
        </PunchListItem> */
    )
}

export default ListPunches
