import { Table, Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { StyledTableRow, TitleCellContent } from '../myChecklists/styles'

import { WorkflowResponse } from '../../../services/apiTypes'
import { UserChip } from './UserChip'
import { ChipStatus } from './chipStatus'
import { CellContent } from './styles'

interface CheckListRowProps {
    WorkFlow: WorkflowResponse
}

export const InspectorOutgoingCheckLists: FunctionComponent<
    CheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()

    if (WorkFlow.status !== 'Committed' || !WorkFlow.checklist) return null
    return (
        <>
            <StyledTableRow>
                <Table.Cell>
                    <TitleCellContent>
                        <Typography variant="body_short_bold">
                            {WorkFlow.checklist.title}
                        </Typography>{' '}
                    </TitleCellContent>
                </Table.Cell>
                <Table.Cell>
                    <CellContent>
                        <UserChip workflow={WorkFlow} />
                    </CellContent>
                </Table.Cell>
                <Table.Cell>
                    <CellContent>
                        <ChipStatus workflow={WorkFlow} />
                    </CellContent>
                </Table.Cell>
            </StyledTableRow>
        </>
    )
}
