import { Typography } from '@equinor/eds-core-react'
import { error_filled, info_circle, warning_filled } from '@equinor/eds-icons'
import { useNavigate, useParams } from 'react-router'
import { formatDate, formatTimestamp } from '../../Helpers/dateFormattingHelpers'
import { AddPunch } from './addPunch/AddPunch'

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
import { ApiStatus, PunchItem } from '../../services/apiTypes'
import apiService from '../../services/api'
import { Loading } from '../../components/loading/Loading'
import { COLORS } from '../../style/GlobalStyles'

export const punchSeverity: PunchSeverity[] = [
    {
        severity: 'Minor',
        color: COLORS.cautionaryYellow,
        icon: info_circle,
    },
    {
        severity: 'Major',
        color: COLORS.warningOrange,
        icon: warning_filled,
    },
    {
        severity: 'Critical',
        color: COLORS.dangerRed,
        icon: error_filled,
    },
]

function Punch() {
    const api = apiService()
    const { punchId } = useParams() as { punchId: string }
    const navigate = useNavigate()
    const [punch, setPunch] = useState<PunchItem>()
    const createdDate = punch && formatDate(punch.createdDate)
    const timestamp = punch && formatTimestamp(punch?.createdDate)
    const [fetchPunchStatus, setFetchPunchStatus] = useState<ApiStatus>(ApiStatus.LOADING)

    function clickHandler(id: string) {
        navigate(`/EditPunch/${id}`)
    }

    useEffect(() => {
        ;(async () => {
            const punchFromApi = await api.getPunch(punchId)
            setPunch(punchFromApi)
            setFetchPunchStatus(ApiStatus.SUCCESS)
        })()
    }, [])

    if (fetchPunchStatus === ApiStatus.LOADING) {
        return <Loading text="Loading punch .." />
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
                                    <Typography>({timestamp})</Typography>
                                </PunchDateContainer>
                            )}
                        </PunchHeader>
                    </PunchHeaderWrapper>
                    {punch && <AddPunch punch={punch} />}
                </Container>
            </PunchWrapper>
        </>
    )
}

export default Punch
