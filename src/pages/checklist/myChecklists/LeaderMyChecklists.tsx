import { FunctionComponent } from 'react'

import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { Checklist } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'
import {
    CellContentMyList,
    MyCheckListCell,
    StyledChip,
    StyledTableRow,
} from './styles'
import { useInspectorsAssigned } from './useInspectorsAssigned'
interface CheckListRowProps {
    checklist: Checklist
    activeRow: boolean
    setActiveRow: (open: boolean) => void
}

export const LeaderMyChecklists: FunctionComponent<CheckListRowProps> = ({
    checklist,
}) => {
    const formatDate = (dateString: string | null) => {
        if (!dateString) {
            return 'No updates'
        }
        const date = new Date(dateString)

        return date.toLocaleDateString('en-GB')
    }

    const navigate = useNavigate()
    const formattedCreatedDate = formatDate(checklist.createdDate || '')
    const { inspectorCounts } = useInspectorsAssigned()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    const inspectorCount = inspectorCounts.find(
        (item) => item.title === checklist.title
    )?.count

    return (
        <>
            {checklist?.id && (
                <StyledTableRow
                    onClick={() => clickHandler(checklist.id || '')}
                >
                    <MyCheckListCell>
                        <CellContentMyList>
                            <Typography variant="body_long_bold">
                                {checklist.title}
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
                        </CellContentMyList>
                    </MyCheckListCell>
                    <MyCheckListCell>
                        <CellContentMyList>
                            <StyledChip>
                                <Icon
                                    data={assignment_user}
                                    color={COLORS.secondary}
                                    style={{ height: '15px' }}
                                />
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {inspectorCount || 0}
                                    {` ${
                                        inspectorCount === 1
                                            ? 'Inspector'
                                            : 'Inspectors'
                                    }`}
                                </Typography>
                            </StyledChip>
                        </CellContentMyList>
                    </MyCheckListCell>

                    <MyCheckListCell>
                        <CellContentMyList>
                            <Chip variant="active" style={{ margin: '0 auto' }}>
                                {checklist.status}
                            </Chip>
                        </CellContentMyList>
                    </MyCheckListCell>
                </StyledTableRow>
            )}
        </>
    )
}
