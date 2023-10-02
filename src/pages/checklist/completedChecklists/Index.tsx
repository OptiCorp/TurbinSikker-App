import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { Table } from '@equinor/eds-core-react'
import { useLocation } from 'react-router'
import { useUserContext } from '../../users/context/userContextProvider'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { CompletedList } from './CompletedList'
import {
    BackgroundWrapCompleted,
    HeadCellCompleted,
    ListWrapperCompletedList,
    StyledHeadContentsCompleted,
    StyledHeadTitleCompleted,
} from './styles'

export const CompletedChecklists = () => {
    const { WorkFlows } = useWorkflowContext()
    const { currentUser } = useUserContext()
    const location = useLocation()
    const state = location.state
    return (
        <>
            <BackgroundWrapCompleted>
                <ListWrapperCompletedList>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCellCompleted>
                                    <StyledHeadTitleCompleted>
                                        Title
                                    </StyledHeadTitleCompleted>
                                </HeadCellCompleted>
                                <HeadCellCompleted>
                                    <StyledHeadContentsCompleted>
                                        Assigned
                                    </StyledHeadContentsCompleted>
                                </HeadCellCompleted>
                                <HeadCellCompleted>
                                    <StyledHeadContentsCompleted>
                                        Status
                                    </StyledHeadContentsCompleted>
                                </HeadCellCompleted>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {WorkFlows.map((WorkFlow) => (
                                <CompletedList
                                    WorkFlow={WorkFlow}
                                    key={WorkFlow.id}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </ListWrapperCompletedList>
            </BackgroundWrapCompleted>

            <DefaultNavigation hideNavbar={state?.isFromCompletedList} />
        </>
    )
}
