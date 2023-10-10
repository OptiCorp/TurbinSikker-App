import { Table } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Workflow } from '../../../services/apiTypes'
import { HeadCell } from '../myChecklists/styles'
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
    const { accounts } = useGlobal()
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const [workflows, setWorkFlows] = useState<Workflow[]>([])

    const api = apiService()
    const { accessToken } = useGlobal()

    useEffect(() => {
        if (!currentUser || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflows()
                setAllWorkFlows(workFlowData)
            } catch (error) {}
        })()
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (!currentUser || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )
                setWorkFlows(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()

        
    }, [accessToken, currentUser?.id])

    if (accounts?.length > 0) {
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
    } else if (!currentUser?.id) {
        return <span>There are currently no users signed in!</span>
    }
}
