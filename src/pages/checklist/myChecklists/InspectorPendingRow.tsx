import { Table, Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { UserChip } from '../inprogressChecklists/UserChip'
import { ChipStatus } from '../inprogressChecklists/chipStatus'

import { WorkflowResponse } from '../../../services/apiTypes'
import { CellContentMyList, StyledTableRow, TitleCellContent } from './styles'

interface PendingCheckListRowProps {
    WorkFlow: WorkflowResponse
}

export const InspectorPendingRow: FunctionComponent<
    PendingCheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()
    const clickHandler = (id: string | undefined) => {
        navigate(`/FillOutChecklist/${id}`)
    }
    if (WorkFlow.checklist.status !== 0) return null
    if (WorkFlow.status !== 'Sent' || !WorkFlow) return null

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.id || '')}>
                <Table.Cell>
                    <TitleCellContent>
                        <Typography variant="body_long_bold">
                            {WorkFlow.checklist.title}
                        </Typography>
                    </TitleCellContent>
                </Table.Cell>
                <Table.Cell>
                    <CellContentMyList>
                        <UserChip workflow={WorkFlow} />
                    </CellContentMyList>
                </Table.Cell>

                <Table.Cell>
                    <CellContentMyList>
                        <ChipStatus workflow={WorkFlow} />
                    </CellContentMyList>
                </Table.Cell>
            </StyledTableRow>
        </>
    )
}
