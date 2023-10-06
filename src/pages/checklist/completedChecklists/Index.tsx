import { Table } from '@equinor/eds-core-react'
import { useLocation } from 'react-router'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { useGetWorkflowByUserId } from '../../../services/hooks/useGetWorkflowByUserId'

import useGlobal from '../../../context/globalContextProvider'
import { CompletedList } from './CompletedList'
import {
    BackgroundWrapCompleted,
    HeadCellCompleted,
    ListWrapperCompletedList,
    StyledHeadContentsCompleted,
    StyledHeadTitleCompleted,
} from './styles'

export const CompletedChecklists = () => {
    const { data: workflows, isFetching, isLoading } = useGetWorkflowByUserId()
    const { currentUser } = useGlobal()
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
                            {workflows?.map((WorkFlow) => (
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
