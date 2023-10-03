import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { Table } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import apiService from '../../../services/api'
import { ApiStatus } from "../../../services/apiTypes"
import { useUserContext } from '../../users/context/userContextProvider'
import { HeadCell } from '../checkListID/styles'
import { WorkFlow } from '../workflow/types'
import { InspectorReceivedCheckLists } from './InspectorCheckList'
import { LeaderCheckListSend } from './LeaderCheckList'
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'


export const CheckList = () => {
    const {accessToken} = useAuth()
    const api = apiService(accessToken)

    const [workflow, setWorkFlow] = useState<WorkFlow[]>([])
    const [workflowStatus, setWorkflowStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const { accounts, inProgress } = useAuth()
    const { currentUser } = useUserContext()

    // const { WorkFlows, allWorkFlows, workFlowById } = useWorkflowContext()

    // const sortedWorkFlows = workflow.sort((a, b) => {
    //     if (a.status === 'Committed' && b.status !== 'Committed') {
    //         return -1
    //     } else if (a.status !== 'Committed' && b.status === 'Committed') {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // })


    useEffect(() => {
     
            if (!currentUser?.id || !accessToken) return
            (async (): Promise<void> => {
                try {
            const workFlows = await api.getAllWorkflowsByUserId(currentUser.id)

            setWorkFlow(workFlows)
            setWorkflowStatus(ApiStatus.SUCCESS);
        } catch (error) {
            setWorkflowStatus(ApiStatus.ERROR);
        }
    })();
    }, [accessToken, currentUser])


  

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
                                            {workflow.map((WorkFlow) => (
                                                <InspectorReceivedCheckLists
                                                    WorkFlow={WorkFlow}
                                                    key={WorkFlow.id}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {workflow.map(
                                                (workflow) => (
                                                    <LeaderCheckListSend
                                                        workflow={
                                                            workflow
                                                        }
                                                        key={workflow.id}
                                                    />
                                                )
                                            )}
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
