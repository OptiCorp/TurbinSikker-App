import { Table } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../context/apiContextProvider'
import { HeadCell } from '../checkListID/styles'
import { CheckListUserRow } from './CheckListRowAll'
import { ReceivedCheckLists } from './receivedCheckLists'
import { ListWrapperCheckL, StyledTableh3, Wrap } from './styles'

export const CheckList = () => {
    const { allCheckList, currentUser } = useContext(ApiContext)

    type IWorkFlow = {
        id: string
        checklistId: string
        userId: string
        status: number | null
        updatedDate: string
    }

    const [checklistWorkFlow, setChecklistWorkFlow] = useState<IWorkFlow[]>([])

    useEffect(() => {
        const fetchCheckListWorkFlow = async () => {
            try {
                const res = await fetch(
                    `http://20.251.37.226:8080/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = await res.json()

                setChecklistWorkFlow(data)
            } catch (error) {
                console.error('Error fetching checklist workflow:', error)
            }
        }
        fetchCheckListWorkFlow()
    }, [currentUser])

    console.log(checklistWorkFlow)
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
                                    {checklistWorkFlow?.map(
                                        (checklistWorkFlow) => (
                                            <ReceivedCheckLists
                                                checklistWorkFlow={
                                                    checklistWorkFlow
                                                }
                                            />
                                        )
                                    )}
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
