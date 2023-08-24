import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { StyledTableRow } from '../checkListID/styles'
import {
    WorkFlow,
    useWorkflowContext,
} from '../workflow/context/workFlowContextProvider'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    WorkFlow: WorkFlow
}

export const ReceivedCheckLists: FunctionComponent<CheckListRowProps> = ({
    WorkFlow,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    const navigate = useNavigate()

    const clickHandler = (id: string | undefined) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    const formattedCreatedDate = formatDate(WorkFlow.checklist.createdDate)

    const formattedUpdatedDate = WorkFlow.formattedUpdateDate
        ? formatDate(WorkFlow.formattedUpdateDate)
        : 'N/A'
    console.log(WorkFlow.formattedUpdateDate)
    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.checklistId)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">
                            {WorkFlow.checklist.title}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Chip
                            style={{
                                minWidth: '120px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{
                                    height: '15px',
                                }}
                            />
                            <Typography
                                variant="caption"
                                token={{
                                    fontSize: '0.8rem',
                                }}
                                style={{}}
                            >
                                {WorkFlow.checklist.createdByUser.firstName}{' '}
                                {WorkFlow.checklist.createdByUser.lastName}
                            </Typography>
                        </Chip>

                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {formattedCreatedDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {WorkFlow.status === null ? (
                            <StyledChip variant="active">
                                Not yet Completed
                            </StyledChip>
                        ) : (
                            <StyledChip variant="error">Inactive</StyledChip>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {WorkFlow.formattedUpdateDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
