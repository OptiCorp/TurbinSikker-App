import { FunctionComponent } from 'react'
import { ICheckListUserID } from '../../context/models/ICheckListUserIDEntity'

import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

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
console.log(userIdCheckList)
    return (
        <>
            <StyledTableRow onClick={() => clickHandler(userIdCheckList.id)}>
                <MyCheckListCell>
                    <CellContentMyList>
                        <Typography variant="body_short_bold">
                            {userIdCheckList.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{
                                gridRow: '3/3',
                            }}
                        >
                            Created {formattedCreatedDate}
                        </Typography>
                    </CellContentMyList>
                </MyCheckListCell>
                <MyCheckListCell>
                    <CellContentMyList>
                        <Chip
                            style={{
                                paddingLeft: '0',
                                lineHeight: '0',
                                margin: '0 auto',
                                gridRow: '1/1',
                            }}
                        >
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            submitted to 0 inspectors
                        </Chip>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{
                                gridRow: '3/3',
                            }}
                        >
                            0/0 delivered
                        </Typography>
                    </CellContentMyList>
                </MyCheckListCell>

                <MyCheckListCell>
                    <CellContentMyList>
                        <Chip
                            variant="active"
                            style={{ margin: '0 auto', gridRow: '1/1' }}
                        >
                            {userIdCheckList.status}
                        </Chip>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {formattedUpdatedDate}
                        </Typography>
                    </CellContentMyList>
                </MyCheckListCell>
            </StyledTableRow>
        </>
    )
}
