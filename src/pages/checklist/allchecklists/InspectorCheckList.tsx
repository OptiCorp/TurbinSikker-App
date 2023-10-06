import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../checkListID/styles'

import { Workflow } from '../../../services/apiTypes'
import { UserChip } from './UserChip'
import { ChipStatus } from './chipStatus'
import { CellContent, StyledBodyTitle, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    WorkFlow: Workflow
}

export const InspectorReceivedCheckLists: FunctionComponent<
    CheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()

    const clickHandler = (id: string | undefined) => {
        navigate(`/FillOutChecklist/${id}`)
    }

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.id)}>
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
