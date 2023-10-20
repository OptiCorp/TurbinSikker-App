import { Table } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Workflow } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'

import { HeadCell } from '../myChecklists/styles'
import { InspectorOutgoingCheckLists } from './inspectorOutgoingChecklists'
import { LeaderInprogressChecklists } from './LeaderInprogressChecklists'
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'

export const Checklist = () => {
    const { currentUser } = useGlobal()

    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const [workflows, setWorkFlows] = useState<Workflow[]>([])

    const api = apiService()

    const { isInspector } = useRoles()

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
                                        {isInspector ? (
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
                                {isInspector ? (
                                    <>
                                        {workflows?.map((workFlow) => (
                                            <InspectorOutgoingCheckLists
                                                WorkFlow={workFlow}
                                                key={workFlow.id}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {allWorkflows?.map((workflow) => (
                                            <LeaderInprogressChecklists
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
}
