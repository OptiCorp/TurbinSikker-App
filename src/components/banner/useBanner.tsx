import { Banner, Button, Icon, Typography } from '@equinor/eds-core-react'
import { warning_filled } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { PunchItem, User, WorkflowResponse } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import { COLORS } from '../../style/GlobalStyles'
import { BannerP, Wrapper } from './styles'
export const BannerComponent: React.FC = () => {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { isInspector } = useRoles()
    const [punches, setPunches] = useState<PunchItem[]>([])
    const [workflow, setWorkFlow] = useState<WorkflowResponse[]>([])

    const location = useLocation()
    useEffect(() => {
        if (punches)
            (async () => {
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

    function resubmitChecklist(workFlowId: string) {
        navigate(`/FillOutChecklist/${workFlowId}/`)
    }

    useEffect(() => {
        if (!currentUser && punches) return
        ;(async () => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )

                setWorkFlow(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id])

    return (
        <>
            {location.pathname.includes('MyCheckLists') ? (
                <>
                    {workflow?.map(
                        (workflow) =>
                            workflow.status === 'Rejected' &&
                            isInspector && (
                                <Banner
                                    style={{
                                        border: `2px solid  ${COLORS.dangerRed};`,
                                    }}
                                    key={workflow.id}
                                    elevation="overlay"
                                >
                                    <Banner.Icon variant="warning">
                                        <Icon data={warning_filled} />
                                    </Banner.Icon>
                                    <Wrapper>
                                        <BannerP>Checklist: </BannerP>
                                        <Typography
                                            style={{ display: 'inline' }}
                                            variant="body_long_bold"
                                        >
                                            {' '}
                                            {workflow?.checklist.title}{' '}
                                        </Typography>
                                        <BannerP> has been rejected! </BannerP>
                                        <BannerP>Comment:</BannerP>
                                        <Typography
                                            style={{ display: 'inline' }}
                                            variant="body_long_bold"
                                        >
                                            {' '}
                                            {workflow.comment}
                                        </Typography>
                                    </Wrapper>
                                    <Banner.Actions>
                                        <Button
                                            onClick={() =>
                                                resubmitChecklist(workflow.id)
                                            }
                                        >
                                            {' '}
                                            resubmit
                                        </Button>
                                    </Banner.Actions>
                                </Banner>
                            )
                    )}
                </>
            ) : (
                <>
                    {punches?.map(
                        (punch) =>
                            punch.status === 'Rejected' &&
                            isInspector && (
                                <>
                                    <Banner
                                        key={punch.id}
                                        elevation="overlay"
                                        style={{
                                            border: `2px solid  ${COLORS.dangerRed};`,
                                        }}
                                    >
                                        <Banner.Icon variant="warning">
                                            <Icon data={warning_filled} />
                                        </Banner.Icon>
                                        <Wrapper>
                                            <BannerP>Ticket </BannerP>
                                            <Typography
                                                style={{ display: 'inline' }}
                                                variant="body_long_bold"
                                            >
                                                {' '}
                                                {punch?.id.split('-')[0]}
                                            </Typography>
                                            <BannerP>
                                                {' '}
                                                has been rejected!{' '}
                                            </BannerP>
                                            <BannerP>Comment:</BannerP>
                                            <Typography
                                                style={{ display: 'inline' }}
                                                variant="body_long_bold"
                                            >
                                                {' '}
                                                {punch.message}
                                            </Typography>
                                        </Wrapper>
                                        <Banner.Actions>
                                            <Button
                                                onClick={() =>
                                                    resubmitPunch(
                                                        punch.id,
                                                        punch.workflowId
                                                    )
                                                }
                                            >
                                                {' '}
                                                resubmit
                                            </Button>
                                        </Banner.Actions>
                                    </Banner>
                                </>
                            )
                    )}
                </>
            )}
        </>
    )
}
