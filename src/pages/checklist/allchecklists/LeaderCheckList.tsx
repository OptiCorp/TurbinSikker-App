import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { useUserContext } from '../../users/context/userContextProvider'
import { StyledTableRow } from '../checkListID/styles'

import { formatDate } from '../../../Helpers'
import { AllWorkFlows } from '../workflow/types'
import { UserChip } from './UserChip'
import { ChipStatus } from './chipStatus'
import { CellContent, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    workflow: AllWorkFlows
}

export const LeaderCheckListSend: FunctionComponent<CheckListRowProps> = ({
    workflow,
}) => {
    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }
    const { currentUser } = useUserContext()

    if (currentUser?.id !== workflow.createdById || workflow.status !== 1)
        return null
    return (
        <>
            <StyledTableRow onClick={() => clickHandler(workflow.checklistId)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography
                            variant="body_long_bold"
                            token={{ fontSize: '0.9rem' }}
                        >
                            {workflow.checklist.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            token={{
                                fontSize: '0.8rem',
                            }}
                            style={{ height: '5px', minWidth: '100px' }}
                        >
                            Created {formatDate(workflow.checklist.createdDate)}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <UserChip workflow={workflow} />
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <ChipStatus workflow={workflow} />
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.7rem',
                            }}
                        >
                            {formatDate(workflow.createdDate)}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
