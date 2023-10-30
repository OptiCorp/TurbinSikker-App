import { Table } from '@equinor/eds-core-react'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Workflow } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'

import { HeadCell, StyledTable } from '../myChecklists/styles'
import { InspectorOutgoingCheckLists } from './inspectorOutgoingChecklists'
import { LeaderInprogressChecklists } from './LeaderInprogressChecklists'
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'

export const ChecklistComponent = () => {
    const { currentUser, refreshList } = useGlobal()

    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [workflows, setWorkFlows] = useState<Workflow[]>([])

    const api = apiService()

    const { isInspector } = useRoles()

    useEffect(() => {
        if (!currentUser?.id) return
        ;(async (): Promise<void> => {
            try {
                const checklistData = await api.getAllChecklistsByUserId(
                    currentUser.id
                )

                setChecklists(checklistData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id, refreshList])

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
    }, [currentUser?.id, refreshList])

    return (
        <>
            <Wrap>
                <ListWrapperCheckL>
                    <StyledTable>
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
                                        {checklists?.map((checklist) => (
                                            <LeaderInprogressChecklists
                                                workflow={checklist}
                                                key={checklist.id}
                                            />
                                        ))}
                                    </>
                                )}
                            </>
                        </Table.Body>
                    </StyledTable>
                </ListWrapperCheckL>
            </Wrap>
            <DefaultNavigation hideNavbar={false} />
        </>
    )
}
