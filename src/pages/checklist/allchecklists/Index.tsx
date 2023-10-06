import { Table } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { ApiStatus, Workflow } from '../../../services/apiTypes'
import { HeadCell } from '../checkListID/styles'
import { InspectorReceivedCheckLists } from './InspectorCheckList'
import { LeaderCheckListSend } from './LeaderCheckList'
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'

export const CheckList = () => {
    const { currentUser } = useGlobal()
    const { accounts, inProgress } = useGlobal()
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const [workflows, setWorkFlows] = useState<Workflow[]>([])
    const [workflowStatus, setWorkflowStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
    const api = apiService()
    const { accessToken } = useGlobal()
    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflows()
                setAllWorkFlows(workFlowData)
                setWorkflowStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setWorkflowStatus(ApiStatus.ERROR)
            }
        })()
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )
                setWorkFlows(workFlowData)
                setWorkflowStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setWorkflowStatus(ApiStatus.ERROR)
            }
        })()
    }, [accessToken, currentUser?.id])

    if (accounts.length > 0) {
        return (
            <>
                <Wrap>
                    <ListWrapperCheckL>
                        <Table>
                            <Table.Head sticky>
                                <Table.Row>
                                    <HeadCell>
                                        <StyledHeadTitle>
                                            Title{' '}
                                        </StyledHeadTitle>
                                    </HeadCell>
                                    <HeadCell>
                                        <StyledHeadContents>
                                            {currentUser?.userRole.name ===
                                            'Inspector' ? (
                                                <>Assigned by</>
                                            ) : (
                                                <>Assigned</>
                                            )}
                                        </StyledHeadContents>
                                    </HeadCell>
                                    <HeadCell>
                                        <StyledHeadContents>
                                            Status
                                        </StyledHeadContents>
                                    </HeadCell>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <>
                                    {currentUser?.userRole.name ===
                                    'Inspector' ? (
                                        <>
                                            {workflows?.map((workFlow) => (
                                                <InspectorReceivedCheckLists
                                                    WorkFlow={workFlow}
                                                    key={workFlow.id}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {allWorkflows?.map((workflow) => (
                                                <LeaderCheckListSend
                                                    workflow={workflow}
                                                    key={workflow.id}
                                                />
                                            ))}
                                        </>
                                    )}
                                </>
                            </Table.Body>
                        </Table>
                    </ListWrapperCheckL>
                </Wrap>
                <DefaultNavigation hideNavbar={false} />
            </>
        )
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
