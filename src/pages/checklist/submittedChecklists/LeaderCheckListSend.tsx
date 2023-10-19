import { Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'
import { formatDate } from '../../../helpers/dateFormattingHelpers'
import { Workflow } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'
import { StyledTableRow } from '../myChecklists/styles'
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
    const clickHandler = (id: string | undefined) => {
        navigate(`/PreviewCheckList/${id}`)
    }
    const { currentUser } = useGlobal()
    const formattedCreatedDate = formatDate(workflow.createdDate || '')

    if (workflow?.creator.id !== currentUser?.id) {
        return null
    }

    if (workflow.status === 'Done') return null

    return (
        <>
            <StyledTableRow
                onClick={() => clickHandler(workflow.checklist.id)}
                style={{
                    backgroundColor:
                        workflow.status === `Committed`
                            ? COLORS.secondary
                            : 'none',
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
                            Created {formattedCreatedDate}
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
