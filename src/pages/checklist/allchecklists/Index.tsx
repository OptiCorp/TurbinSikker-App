import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { Table } from '@equinor/eds-core-react'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../users/context/userContextProvider'
import { HeadCell } from '../checkListID/styles'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { InspectorReceivedCheckLists } from './InspectorCheckList'
import { LeaderCheckListSend } from './LeaderCheckList'
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'

export const CheckList = () => {
    const { accounts, inProgress } = useAuth()
    const { currentUser } = useUserContext()
    const { WorkFlows, allWorkFlows } = useWorkflowContext()
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
                                            {WorkFlows.map((WorkFlow) => (
                                                <InspectorReceivedCheckLists
                                                    WorkFlow={WorkFlow}
                                                    key={WorkFlow.id}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {allWorkFlows.map((allWorkFlow) => (
                                                <LeaderCheckListSend
                                                    workflow={allWorkFlow}
                                                    key={allWorkFlow.id}
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
