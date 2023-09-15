import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../checkListID/styles'
import { WorkFlow } from '../workflow/types'

import { ChipStatus } from './chipStatus'
import { CellContent, StyledBodyTitle, StyledTableCellCheckL } from './styles'
import { UserChip } from './UserChip'

interface CheckListRowProps {
    WorkFlow: WorkFlow
}

export const InspectorReceivedCheckLists: FunctionComponent<
    CheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()

    const clickHandler = (id: string | undefined) => {
        navigate(`/FillOutCheckList/${id}`)
    }

    if (WorkFlow.status !== 'Sent') return null
    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.checklist.id)}>
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
