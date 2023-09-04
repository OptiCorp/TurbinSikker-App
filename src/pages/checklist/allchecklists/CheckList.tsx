import { Table } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { CheckListContext } from '../../context/CheckListContextProvider'
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
    const { allCheckList } = useContext(CheckListContext)
    const { currentUser } = useUserContext()

    const text = () => {
        if (currentUser?.userRole.name === 'Leader') {
            return <>Assigned</>
        } else {
            return <>Assigned by</>
        }
    }

    const statusText = () => {
        if (currentUser?.userRole.name === 'Leader') {
            return <>Status</>
        } else {
            return <>Status</>
        }
    }

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
                                        Assigned
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
                                                allWorkFlow={allWorkFlow}
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
