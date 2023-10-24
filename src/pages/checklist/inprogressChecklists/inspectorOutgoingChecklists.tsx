import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../myChecklists/styles'

import { Workflow } from '../../../services/apiTypes'
import { UserChip } from './UserChip'
import { ChipStatus } from './chipStatus'
import { CellContent, StyledBodyTitle, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    WorkFlow: Workflow
}

export const InspectorOutgoingCheckLists: FunctionComponent<
    CheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()

    if (WorkFlow.status !== 'Committed' || !WorkFlow.checklist) return null
    return (
        <>
            <StyledTableRow>
                <StyledTableCellCheckL>
                    <StyledBodyTitle>
                        <Typography variant="body_short_bold">
                            {WorkFlow.checklist.title}
                        </Typography>
                    </StyledBodyTitle>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <UserChip workflow={WorkFlow} />
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <ChipStatus workflow={WorkFlow} />
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
