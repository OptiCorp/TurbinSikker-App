import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { UserChip } from '../allchecklists/UserChip'
import { ChipStatus } from '../allchecklists/chipStatus'

import { Workflow } from '../../../services/apiTypes'
import {
    CellContentCompleted,
    CompletedCell,
    StyledBodyTitleCompleted,
    StyledTableRowCompleted,
} from './styles'

interface CompletedRowProps {
    WorkFlow: Workflow
}

export const CompletedList: FunctionComponent<CompletedRowProps> = ({
    WorkFlow,
}) => {
    const navigate = useNavigate()

    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`, {
            state: { isFromCompletedList: true },
        })
    }

    if (WorkFlow.status !== 'Done') return null
    return (
        <>
            {WorkFlow && (
                <StyledTableRowCompleted
                    onClick={() => clickHandler(WorkFlow.checklist.id)}
                >
                    <CompletedCell>
                        <StyledBodyTitleCompleted>
                            <Typography variant="body_long_bold">
                                {WorkFlow.checklist.title}
                            </Typography>
                        </StyledBodyTitleCompleted>
                    </CompletedCell>
                    <CompletedCell>
                        <CellContentCompleted>
                            <UserChip workflow={WorkFlow} />
                        </CellContentCompleted>
                    </CompletedCell>

                    <CompletedCell>
                        <CellContentCompleted>
                            <ChipStatus workflow={WorkFlow} />
                        </CellContentCompleted>
                    </CompletedCell>
                </StyledTableRowCompleted>
            )}
        </>
    )
}
