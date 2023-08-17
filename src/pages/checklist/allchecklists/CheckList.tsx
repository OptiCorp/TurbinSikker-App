import { Table } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../context/apiContextProvider'
import { CheckListUserRow } from './CheckListRowAll'

import { list } from '@equinor/eds-icons'
import { HeadCell } from '../checkListID/styles'
import { ReceivedCheckLists } from './receivedCheckLists'
import { ListWrapperCheckL, StyledTableh3, Wrap } from './styles'

export const CheckList = () => {
    const {
        allCheckList,
        checklistWorkFlow,
        currentUser,
        userIdCheckList,
        result,
    } = useContext(ApiContext)

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
                            {currentUser?.userRole.name === 'Inspector' ? (
                                <>
                                    {checklistWorkFlow?.map(
                                        (checklistWorkFlow) => (
                                            <ReceivedCheckLists
                                                key={checklistWorkFlow.id}
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
