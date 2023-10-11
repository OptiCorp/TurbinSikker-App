import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { UserChip } from '../submittedChecklists/UserChip'
import { ChipStatus } from '../submittedChecklists/chipStatus'
import { StyledBodyTitle } from '../submittedChecklists/styles'

import { Workflow } from '../../../services/apiTypes'
import { CellContentMyList, MyCheckListCell, StyledTableRow } from './styles'

interface PendingCheckListRowProps {
    WorkFlow: Workflow
}

export const InspectorPendingRow: FunctionComponent<
    PendingCheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    if (WorkFlow.status !== 'Committed' || !WorkFlow.checklist) return null

    return (
        <>
            <StyledTableRow
                onClick={() => clickHandler(WorkFlow.checklist.id || '')}
            >
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
