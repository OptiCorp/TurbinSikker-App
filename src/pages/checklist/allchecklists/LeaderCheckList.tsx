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
import { Workflow } from 'src/services/apiTypes'

interface CheckListRowProps {
    workflow: Workflow
}

export const LeaderCheckListSend: FunctionComponent<CheckListRowProps> = ({
    workflow,
}) => {
    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }
    const { currentUser } = useUserContext()

    if (workflow.creator.id !== currentUser?.id) {
        return null
    }

    //   if
    //    (workflow?.status === 'Committed') ret

    return (
        <>
            <StyledTableRow
                onClick={() => clickHandler(workflow.checklist.id)}
                style={{
                    backgroundColor:
                        workflow.status === 'Committed' ? 'lightGrey' : 'none',
                }}
            >
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_long_bold">
                            {workflow.checklist.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            token={{
                                fontSize: '0.8rem',
                            }}
                            style={{ height: '0px', minWidth: '100px' }}
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
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
