import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { UserChip } from '../inprogressChecklists/UserChip'
import { ChipStatus } from '../inprogressChecklists/chipStatus'

import useGlobal from '../../../context/globalContextProvider'
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

export const ForReviewList: FunctionComponent<CompletedRowProps> = ({
    WorkFlow,
}) => {
    const navigate = useNavigate()
    const { currentUser } = useGlobal()
    const clickHandler = (id: string) => {
        navigate(`/FillOutChecklist/${id}`, {
            state: { isFromCompletedList: true },
        })
    }
    if (WorkFlow?.creator.id !== currentUser?.id) {
        return null
    }
    if (WorkFlow.status !== 'Committed') return null

    return (
        <>
            <StyledTableRowCompleted onClick={() => clickHandler(WorkFlow.id)}>
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
        </>
    )
}
