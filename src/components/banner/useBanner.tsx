import { Banner, Button, Icon, Typography } from '@equinor/eds-core-react'
import { thumbs_down } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import {
    PunchListBoxContainer,
    StatusBadge,
    StatusBadgeContainer,
} from '../../pages/punch/listPunches/styles'
import apiService from '../../services/api'
import { PunchItem, User } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import { Wrapper } from './styles'

export const BannerComponent: React.FC = () => {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { isLeader, isInspector } = useRoles()
    const [punches, setPunches] = useState<PunchItem[]>([])
    useEffect(() => {
        ;(async () => {
            if (isInspector) {
                const punchesFromApi = await api.getPunchInspectorId(
                    currentUser?.id
                )
                setPunches(punchesFromApi)
            } else {
                const punchesFromApi = await api.getPunchByLeaderId(
                    currentUser?.id
                )
                setPunches(punchesFromApi)
            }
        })()
    }, [currentUser])

    const navigate = useNavigate()
    function resubmitPunch(punchId: string, workFlowId: string) {
        navigate(`/workflow/${workFlowId}/punch/${punchId}`)
    }

    return (
        <>
            {punches?.map(
                (punch) =>
                    punch.status === 'Rejected' &&
                    isInspector && (
                        <Banner
                            key={punch.id}
                            elevation="overlay"
                            style={{
                                width: '100%',
                                maxWidth: '900px',
                                minWidth: '300px',
                            }}
                        >
                            <PunchListBoxContainer>
                                <StatusBadgeContainer>
                                    <StatusBadge status={punch.status}>
                                        {punch.status}
                                    </StatusBadge>
                                </StatusBadgeContainer>

                                <Banner.Icon variant="warning">
                                    <Icon data={thumbs_down} />
                                </Banner.Icon>
                                <Wrapper>
                                    <Typography variant="caption">
                                        Ticket-{punch?.id.split('-')[0]}
                                    </Typography>

                                    <Typography variant="body_long_bold">
                                        has been rejected!
                                    </Typography>
                                </Wrapper>

                                <Banner.Actions>
                                    <Button
                                        color="danger"
                                        onClick={() =>
                                            resubmitPunch(
                                                punch.id,
                                                punch.workflowId
                                            )
                                        }
                                    >
                                        resubmit
                                    </Button>
                                </Banner.Actions>
                            </PunchListBoxContainer>
                        </Banner>
                    )
            )}
        </>
    )
}
