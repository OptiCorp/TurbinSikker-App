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
    const [checklistData, setChecklistData] = useState<CheckListEntity | null>()
    const { testData } = useWorkflowContext()
    const [date, setDate] = useState<string>()
    const [updateDate, setUpdateDate] = useState<string>()

    useEffect(() => {
        const fetchChecklistData = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetChecklist?id=${WorkFlow.checklistId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as CheckListEntity

                setChecklistData(data)
                setDate(formatDate(data.createdDate))
                setUpdateDate(formatDate(data.updatedDate))
            } catch (error) {
                console.error('Error fetching checklist data:')
            }
        }
        console.log(WorkFlow)
        fetchChecklistData()
    }, [WorkFlow])

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(checklistData?.id)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">
                            {checklistData?.title}
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
                                {checklistData?.user.firstName}{' '}
                                {checklistData?.user.lastName}
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
                            {date}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {WorkFlow.status === null ? (
                            <StyledChip variant="active">Received</StyledChip>
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
                            {updateDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
