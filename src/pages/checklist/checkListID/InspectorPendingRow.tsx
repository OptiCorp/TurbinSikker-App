import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { formatDate } from '../../../Helpers'
import { ChipStatus } from '../allchecklists/chipStatus'
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

    const formattedDate = formatDate(WorkFlow?.updatedDate ?? '')

    if (WorkFlow.status !== 'Committed') return null
    return (
        <>
            {WorkFlow && (
                <StyledTableRow
                    onClick={() => clickHandler(WorkFlow.checklistId)}
                >
                    <MyCheckListCell>
                        <CellContentMyList>
                            <Typography variant="body_long_bold">
                                {WorkFlow.checklist.title}
                            </Typography>
                        </CellContentMyList>
                    </MyCheckListCell>
                    <MyCheckListCell>
                        <CellContentMyList>
                            <Chip
                                style={{
                                    minWidth: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',

                                    alignContent: 'center',
                                    margin: '0 auto',
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
                                    {WorkFlow.creator.firstName}{' '}
                                    {WorkFlow.creator.lastName}
                                </Typography>
                            </Chip>
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
