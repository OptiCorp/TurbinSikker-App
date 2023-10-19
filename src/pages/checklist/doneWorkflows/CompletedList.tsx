import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { UserChip } from '../submittedChecklists/UserChip'
import { ChipStatus } from '../submittedChecklists/chipStatus'

import { Workflow } from '../../../services/apiTypes'
import {
    CellContentCompleted,
    CompletedCell,
    StyledBodyTitleCompleted,
    StyledTableRowCompleted,
} from './styles'
import useGlobal from '../../../context/globalContextProvider'

interface CompletedRowProps {
    WorkFlow: Workflow
}

export const CompletedList: FunctionComponent<CompletedRowProps> = ({
    WorkFlow,
}) => {
    const navigate = useNavigate()
    const { currentUser } = useGlobal()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`, {
            state: { isFromCompletedList: true },
        })
    }
    if (WorkFlow?.creator.id !== currentUser?.id) {
        return null
    }
    if (WorkFlow.status !== 'Done') return null

    return (
        <>
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
        </>
    )
}
