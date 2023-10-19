import { Table } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Workflow } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
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
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const [workflows, setWorkFlows] = useState<Workflow[]>([])
    const { isInspector } = useRoles()
    useEffect(() => {
        if (!currentUser) return
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
    }, [currentUser?.id])

    useEffect(() => {
        if (!currentUser) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflows()
                setAllWorkFlows(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id])

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
                            <>
                                
                                    <>
                                        {allWorkflows?.map((workflow) => (
                                            <CompletedList
                                                WorkFlow={workflow}
                                                key={workflow.id}
                                            />
                                        ))}
                                    </>
                                
                            </>
                        </Table.Body>
                    </Table>
                </ListWrapperCompletedList>
            </BackgroundWrapCompleted>

            <DefaultNavigation hideNavbar={state?.isFromCompletedList} />
        </>
    )
}
