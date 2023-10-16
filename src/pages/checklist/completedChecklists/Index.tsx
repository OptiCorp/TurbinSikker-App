import { Table } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Workflow } from '../../../services/apiTypes'
import { CompletedList } from './CompletedList'
import {
    BackgroundWrapCompleted,
    HeadCellCompleted,
    ListWrapperCompletedList,
    StyledHeadContentsCompleted,
    StyledHeadTitleCompleted,
} from './styles'

export const CompletedChecklists = () => {
    const api = apiService()

    const location = useLocation()
    const state = location.state
    const { accessToken, currentUser } = useGlobal()
    const [workflows, setWorkFlows] = useState<Workflow[]>([])
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
                            {workflows.map((WorkFlow) => (
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
