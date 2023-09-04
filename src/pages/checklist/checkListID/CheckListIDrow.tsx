import { FunctionComponent } from 'react'
import { ICheckListUserID } from '../../context/models/ICheckListUserIDEntity'

import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { StyledChip } from '../allchecklists/styles'
import { CellContentMyList, MyCheckListCell, StyledTableRow } from './styles'

interface CheckListRowProps {
    userIdCheckList: ICheckListUserID
    activeRow: boolean
    setActiveRow: (open: boolean) => void
}

export const CheckListUserIDRow: FunctionComponent<CheckListRowProps> = ({
    userIdCheckList,
}) => {
    const formatDate = (dateString: string | null) => {
        if (!dateString) {
            return 'No updates'
        }
        const date = new Date(dateString)

        return date.toLocaleDateString('en-GB')
    }

    const navigate = useNavigate()
    const formattedCreatedDate = formatDate(userIdCheckList.createdDate)
    const formattedUpdatedDate = formatDate(userIdCheckList.updatedDate)

    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    return (
        <>
            {userIdCheckList && (
                <StyledTableRow
                    onClick={() => clickHandler(userIdCheckList.id)}
                >
                    <MyCheckListCell>
                        <CellContentMyList>
                            <Typography variant="body_long_bold">
                                {userIdCheckList.title}
                            </Typography>

                            <Typography
                                variant="caption"
                                token={{
                                    fontSize: '1em',
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
                                        fontSize: '1rem',
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
                                {userIdCheckList.status}
                            </Chip>
                            <Typography
                                variant="caption"
                                token={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {formattedUpdatedDate}
                            </Typography>
                        </CellContentMyList>
                    </MyCheckListCell>
                </StyledTableRow>
            )}
        </>
    )
}
