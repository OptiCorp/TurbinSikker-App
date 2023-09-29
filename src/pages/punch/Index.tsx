import { CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { formatDate, formatTimeStamp } from '../../Helpers/index'
import { AddPunch } from './addPunch/AddPunch'
import { usePunchContext } from './context/PunchContextProvider'
import {
    Container,
    PunchDateContainer,
    PunchHeader,
    PunchHeaderWrapper,
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
    const timeStamp = punch && formatTimeStamp(punch?.createdDate)
    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    return (
        <>
            <PunchWrapper>
                <Container>
                    <PunchHeaderWrapper>
                        <PunchHeader>
                            <SeverityIconContainer>
                                <Typography variant="h4">
                                    Ticket-{punch?.id.split('-')[0]}
                                </Typography>
                            </SeverityIconContainer>
                            {punch && (
                                <PunchDateContainer>
                                    <Typography>{createdDate}</Typography>
                                    <Typography>({timeStamp})</Typography>
                                </PunchDateContainer>
                            )}
                        </PunchHeader>
                    </PunchHeaderWrapper>

                    <AddPunch />
                </Container>
            </PunchWrapper>
        </>
    )
}

export default Punch
