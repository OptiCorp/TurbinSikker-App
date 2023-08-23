import { Table } from '@equinor/eds-core-react'
import React, { useContext, useEffect, useState } from 'react'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { CheckListContext } from '../../context/CheckListContextProvider'
import { HeadCell } from '../checkListID/styles'
import {
    WorkFlow,
    useWorkflowContext,
} from '../workflow/context/workFlowContextProvider'
import { CheckListUserRow } from './CheckListRowAll'
import { ReceivedCheckLists } from './receivedCheckLists'
import { ListWrapperCheckL, StyledTableh3, Wrap } from './styles'

export const CheckList = () => {
    const { allCheckList } = useContext(CheckListContext)
    const { currentUser } = useUserContext()

    const { WorkFlows , testData} = useWorkflowContext()
    const [checklistWorkFlow, setChecklistWorkFlow] = useState<WorkFlow[]>([])

    // useEffect(() => {
    //     const fetchCheckListWorkFlow = async () => {
    //         try {
    //             const res = await fetch(
    //                 `https://localhost:7290/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}`
    //             )
    //             if (!res.ok)
    //                 throw new Error('Failed with HTTP code ' + res.status)
    //                 const data = (await res.json()) as WorkFlow[]

    //             setChecklistWorkFlow(data)
    //         } catch (error) {
    //             console.error('Error fetching checklist workflow:', error)
    //         }
    //     }
    //     fetchCheckListWorkFlow()
    // }, [currentUser])

    console.log(testData)
    return (
        <>
            <Wrap>
                <ListWrapperCheckL>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <StyledTableh3>Title</StyledTableh3>
                                </HeadCell>
                                <HeadCell>
                                    <StyledTableh3>Created by</StyledTableh3>
                                </HeadCell>
                                <HeadCell>
                                    <StyledTableh3>Date received</StyledTableh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {currentUser?.userRole.name === 'Inspector' ? (
                                <>
                                    {WorkFlows.map((WorkFlow) => (
                                        <ReceivedCheckLists
                                            WorkFlow={WorkFlow}
                                            key={WorkFlow.id}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {allCheckList?.map((allCheckList) => (
                                        <CheckListUserRow
                                            allCheckList={allCheckList}
                                            key={allCheckList.id}
                                        />
                                    ))}
                                </>
                            )}
                        </Table.Body>
                    </Table>
                </ListWrapperCheckL>
            </Wrap>
        </>
    )
}
