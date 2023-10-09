import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { StyledTableRow } from '../myChecklists/styles'

import { formatDate } from '../../../Helpers'
import useGlobal from '../../../context/globalContextProvider'
import { Workflow } from '../../../services/apiTypes'
import { UserChip } from './UserChip'
import { ChipStatus } from './chipStatus'
import { CellContent, StyledTableCellCheckL } from './styles'

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
    const { currentUser } = useGlobal()

    if (workflow?.creator.id !== currentUser?.id) {
        return null
    }

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
