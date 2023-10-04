import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { Table } from '@equinor/eds-core-react'
import { useApiHooks } from '../../../Helpers/useApiHooks'
import useAuth from '../../../context/AuthContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { useGetWorkflowByUserId } from '../../../services/hooks/useGetWorkflowByUserId'
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

    const { currentUser } = useUserContext()
    const { accounts, inProgress } = useAuth()
    const { data: workflows, isFetching, isLoading } = useGetWorkflowByUserId()
  
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
                                            {workflows?.map((workflow) => (
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
