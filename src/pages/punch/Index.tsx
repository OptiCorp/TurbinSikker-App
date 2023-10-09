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
import { useEffect, useState } from 'react'
import { PunchItem, User } from '../../services/apiTypes'
import apiService from '../../services/api'
import useGlobal from '../../context/globalContextProvider'

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
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const navigate = useNavigate()
    const [punch, setPunch] = useState<PunchItem>()
    const createdDate = punch && formatDate(punch.createdDate)
    const timeStamp = punch && formatTimeStamp(punch?.createdDate)
    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    useEffect(() => {
        ;async () => {
            const punchFromApi = await api.getPunch(currentUser?.id)
            setPunch(punchFromApi)
        }
    }, [])
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
