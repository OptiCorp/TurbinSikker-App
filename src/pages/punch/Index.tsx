import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { formatDate } from '../../Helpers/index'
import { AddPunch } from './addPunch/AddPunch'
import { usePunchContext } from './context/PunchContextProvider'
import {
    Container,
    PunchDateContainer,
    PunchHeader,
    PunchWrapper,
    SeverityIconContainer,
} from './styles'
import { PunchSeverity } from './types'

export const punchSeverity: PunchSeverity[] = [
    {
        severity: 'Minor',
        color: '#fbca36',
        icon: info_circle,
    },
    {
        severity: 'Major',
        color: '#ed8936',
        icon: warning_filled,
    },
    {
        severity: 'Critical',
        color: '#eb0000',
        icon: error_filled,
    },
]

function Punch() {
    const navigate = useNavigate()
    const { punch } = usePunchContext()
    const createdDate = punch && formatDate(punch.createdDate)
    const updatedDate = punch?.updatedDate && formatDate(punch.updatedDate)

    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    return (
        <>
            <PunchWrapper>
                <Container>
                    <PunchHeader>
                        <SeverityIconContainer>
                            {punchSeverity.map((severityItem, idx) => {
                                if (punch?.severity === severityItem.severity) {
                                    return (
                                        <Icon
                                            key={idx}
                                            data={severityItem.icon}
                                            style={{
                                                color: severityItem.color,
                                            }}
                                        />
                                    )
                                }
                            })}

                            <h4>Ticket-{punch?.id.split('-')[0]}</h4>
                        </SeverityIconContainer>
                        <PunchDateContainer>
                            <p>{createdDate}</p>
                            {createdDate == updatedDate && (
                                <p style={{ fontSize: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>modified:</span>
                                    {updatedDate}
                                </p>
                            )}
                        </PunchDateContainer>
                    </PunchHeader>

                    <AddPunch />
                </Container>
            </PunchWrapper>
        </>
    )
}

export default Punch
