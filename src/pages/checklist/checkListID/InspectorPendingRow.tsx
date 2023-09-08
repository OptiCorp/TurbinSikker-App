import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { UserChip } from '../allchecklists/UserChip'
import { ChipStatus } from '../allchecklists/chipStatus'
import { StyledBodyTitle } from '../allchecklists/styles'
import { WorkFlow } from '../workflow/types'
import { CellContentMyList, MyCheckListCell, StyledTableRow } from './styles'

interface PendingCheckListRowProps {
    WorkFlow: WorkFlow
}

export const InspectorPendingRow: FunctionComponent<
    PendingCheckListRowProps
> = ({ WorkFlow }) => {
    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    if (WorkFlow.status === 'Sent') return null
    return (
        <>
            {WorkFlow && (
                <StyledTableRow
                    onClick={() => clickHandler(WorkFlow.checklist.id)}
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
            )}
        </>
    )
}
