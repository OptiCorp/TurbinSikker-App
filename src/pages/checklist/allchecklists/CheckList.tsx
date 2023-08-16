import { Table } from '@equinor/eds-core-react'
import { useContext, useEffect } from 'react'
import { ApiContext } from '../../context/apiContextProvider'
import { CheckListUserRow } from './CheckListRowAll'

import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { useNavigate } from 'react-router'
import { HeadCell } from '../checkListID/styles'
import { ListWrapperCheckL, StyledTableh3, Wrap } from './styles'
import UseRow from './useRow/useRow'

export const CheckList = () => {
    const { allCheckList, currentUser, userIdCheckList, checklistWorkFlow } =
        useContext(ApiContext)
    const { checkListId } = useAddTaskForm()

    // useEffect(() => {
    //     const fetchAllCheckListsId = async () => {
    //         const res = await fetch(
    //             `http://20.251.37.226:8080/api/GetChecklist?id=${id}`
    //         )

    // })

    // const status = () => {
    //     if (allCheckList.status === 'Active') {
    //         return <StyledChip variant="active">Active</StyledChip>
    //     } else {
    //         return <StyledChip variant="error">Inactive</StyledChip>
    //     }
    // }

    // const formattedUpdatedDate = formatDate(
    //     allCheckList.user.userRole.name === 'Leader'
    //         ? allCheckList.updatedDate
    //         : userIdCheckList.updatedDate
    // )
    // const formattedCreatedDate = formatDate(
    //     allCheckList.user.userRole.name === 'Leader'
    //         ? allCheckList.createdDate
    //         : userIdCheckList.createdDate
    // )
    // const formattedCreatedDateUser = formatDate(allCheckList.user.createdDate)
    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    return (
        <>
            <Wrap>
                <ListWrapperCheckL>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <StyledTableh3>Name</StyledTableh3>
                                </HeadCell>
                                <HeadCell>
                                    <StyledTableh3>Send in by</StyledTableh3>
                                </HeadCell>
                                <HeadCell>
                                    <StyledTableh3>Date Issued</StyledTableh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {allCheckList?.map((allCheckList) => (
                                <CheckListUserRow
                                    allCheckList={allCheckList}
                                    key={allCheckList.id}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </ListWrapperCheckL>
            </Wrap>
        </>
    )
}
