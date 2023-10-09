import { FunctionComponent } from 'react'

import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { Checklist } from '../../../services/apiTypes'
import { StyledChip } from '../allchecklists/styles'
import { CellContentMyList, MyCheckListCell, StyledTableRow } from './styles'

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
    const formattedUpdatedDate = formatDate(checklist.updatedDate || '')

    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

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
                            <StyledChip
                                style={{
                                    minWidth: '100px',
                                    display: 'flex',
                                    margin: '0 auto',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                }}
                            >
                                <Icon
                                    data={assignment_user}
                                    color="#243746"
                                    style={{ height: '15px' }}
                                />
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    0 inspectors
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
