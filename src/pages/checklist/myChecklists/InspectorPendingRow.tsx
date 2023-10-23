import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { UserChip } from '../inprogressChecklists/UserChip'
import { ChipStatus } from '../inprogressChecklists/chipStatus'
import { StyledBodyTitle } from '../inprogressChecklists/styles'

import { Workflow } from '../../../services/apiTypes'
import { CellContentMyList, MyCheckListCell, StyledTableRow } from './styles'

interface PendingCheckListRowProps {
    WorkFlow: Workflow
}

export const InspectorPendingRow: FunctionComponent<
    PendingCheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()
    const clickHandler = (id: string | undefined) => {
        navigate(`/FillOutChecklist/${id}`)
    }
    
    if (WorkFlow.status !== 'Sent' || !WorkFlow) return null

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.id || '')}>
                <MyCheckListCell>
                    <StyledBodyTitle>
                        <Typography variant="body_long_bold">
                            {WorkFlow.checklist.title}
                        </Typography>
                    </StyledBodyTitle>
                </MyCheckListCell>
                <MyCheckListCell>
                    <CellContentMyList>
                        <UserChip workflow={WorkFlow} />
                    </CellContentMyList>
                </MyCheckListCell>

                <MyCheckListCell>
                    <CellContentMyList>
                        <ChipStatus workflow={WorkFlow} />
                    </CellContentMyList>
                </MyCheckListCell>
            </StyledTableRow>
        </>
    )
}
