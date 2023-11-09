import {
    Banner,
    Button,
    Icon,
    Table,
    Typography,
} from '@equinor/eds-core-react'
import { thumbs_down } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import { UserChip } from '../../pages/checklist/inprogressChecklists/UserChip'
import {
    PunchListBoxContainer,
    StatusBadge,
} from '../../pages/punch/listPunches/styles'
import apiService from '../../services/api'
import { PunchItem, User, WorkflowResponse } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import {
    BannerContainer,
    StatusBadgeContainer,
    TableStyledBanner,
    TableStyledHead,
    Wrapper,
} from './styles'

export const BannerComponent: React.FC = () => {
    const { currentUser } = useGlobal() as { currentUser: User }
    const api = apiService()
    const { isLeader, isInspector } = useRoles()
    const [punches, setPunches] = useState<PunchItem[]>([])
    const [workflow, setWorkFlow] = useState<WorkflowResponse[]>([])

    const location = useLocation()
    useEffect(() => {
        if (!punches && !punches)
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
                                    key={workflow.id}
                                    elevation="raised"
                                    onClick={() =>
                                        resubmitChecklist(workflow.id)
                                    }
                                >
                                    <BannerContainer>
                                        <StatusBadgeContainer>
                                            <StatusBadge
                                                status={workflow.status}
                                            >
                                                {workflow.status}
                                            </StatusBadge>{' '}
                                        </StatusBadgeContainer>

                                        <Table style={{ borderRadius: '10px' }}>
                                            <Table.Head>
                                                <Table.Row>
                                                    <TableStyledHead>
                                                        <Typography
                                                            token={{}}
                                                            variant="body_long_bold"
                                                        >
                                                            Checklist
                                                        </Typography>{' '}
                                                    </TableStyledHead>
                                                    <TableStyledHead>
                                                        <Typography
                                                            token={{}}
                                                            variant="body_long_bold"
                                                        >
                                                            rejected by
                                                        </Typography>
                                                    </TableStyledHead>

                                                    <TableStyledHead>
                                                        {' '}
                                                        <Typography
                                                            token={{}}
                                                            variant="body_long_bold"
                                                        >
                                                            comment
                                                        </Typography>{' '}
                                                    </TableStyledHead>
                                                </Table.Row>
                                            </Table.Head>
                                            <Table.Body>
                                                <TableStyledBanner>
                                                    {' '}
                                                    <TableStyledHead>
                                                        {' '}
                                                        <Typography variant="body_long">
                                                            {
                                                                workflow
                                                                    ?.checklist
                                                                    .title
                                                            }
                                                        </Typography>
                                                    </TableStyledHead>
                                                    <TableStyledHead>
                                                        <UserChip
                                                            workflow={workflow}
                                                        />
                                                    </TableStyledHead>
                                                    <TableStyledHead>
                                                        {' '}
                                                        <Typography variant="caption">
                                                            {workflow.comment}
                                                        </Typography>{' '}
                                                    </TableStyledHead>
                                                </TableStyledBanner>
                                            </Table.Body>
                                        </Table>
                                    </BannerContainer>
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
                                <Banner
                                    key={punch.id}
                                    elevation="overlay"
                                    style={{
                                        width: '100%',
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
                                                variant="contained"
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
            )}
        </>
    )
}
