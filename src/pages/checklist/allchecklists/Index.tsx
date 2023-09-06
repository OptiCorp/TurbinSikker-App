import { Table } from '@equinor/eds-core-react'
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
    const { currentUser } = useUserContext()
    const { WorkFlows, allWorkFlows } = useWorkflowContext()

    return (
        <>
            <Wrap>
                <ListWrapperCheckL>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <StyledHeadTitle>Title </StyledHeadTitle>
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
                                {currentUser?.userRole.name === 'Inspector' ? (
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
        </>
    )
}
