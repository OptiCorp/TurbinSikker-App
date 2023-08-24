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
import {
    ListWrapperCheckL,
    StyledHeadContents,
    StyledHeadTitle,
    Wrap,
} from './styles'

export const CheckList = () => {
    const { allCheckList } = useContext(CheckListContext)
    const { currentUser } = useUserContext()

    const text = () => {
        if (currentUser?.userRole.name === 'Leader') {
            return <>Assigned</>
        } else {
            return <>Submitted by</>
        }
    }

    const statusText = () => {
        if (currentUser?.userRole.name === 'Leader') {
            return <>Status</>
        } else {
            return <>Status</>
        }
    }

    const { WorkFlows, allWorkFlows } = useWorkflowContext()

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
                                        {text()}
                                    </StyledHeadContents>
                                </HeadCell>
                                <HeadCell>
                                    <StyledHeadContents>
                                        {statusText()}
                                    </StyledHeadContents>
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
                                    {allWorkFlows.map((allWorkFlow) => (
                                        <CheckListUserRow
                                            allWorkFlow={allWorkFlow}
                                            key={allWorkFlow.id}
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
