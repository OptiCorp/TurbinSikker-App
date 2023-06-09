import { FunctionComponent } from 'react'
import { ICheckListUserID } from '../../context/apiContextProvider'

import { Button, Chip, Icon, Table, Typography } from '@equinor/eds-core-react'
import { assignment_user, calendar, timer } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { CellContentMyList, MyCheckListCell } from './styles'

interface CheckListRowProps {
    userIdCheckList: ICheckListUserID
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
            <Table.Row>
                <MyCheckListCell>
                    <CellContentMyList>
                        <Typography variant="body_short_bold">
                            {userIdCheckList.title}
                        </Typography>

                        <Chip style={{ paddingLeft: '0', lineHeight: '0' }}>
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            submitted to 0 inspectors{' '}
                        </Chip>
                        <Chip
                            style={{
                                paddingLeft: '0',
                                lineHeight: '0',
                                background: 'none',
                            }}
                        >
                            <Icon
                                data={calendar}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            <Typography
                                variant="caption"
                                token={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                }}
                            >
                                Created {formattedCreatedDate}
                            </Typography>
                        </Chip>
                    </CellContentMyList>
                </MyCheckListCell>
                <MyCheckListCell>
                    <Chip variant="active" style={{ margin: '0 auto' }}>
                        {userIdCheckList.status}
                    </Chip>
                </MyCheckListCell>

                <MyCheckListCell>
                    <CellContentMyList>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                            }}
                        >
                            {formattedUpdatedDate}
                            <Icon
                                data={timer}
                                color="#243746"
                                style={{ height: '14px' }}
                            />
                        </Typography>
                        <Button
                            style={{
                                width: '55px',
                                fontSize: '0.8rem',
                                height: '25px',
                                margin: '0 auto',
                                gridRow: '3/3',
                            }}
                            color="primary"
                            onClick={() => clickHandler(userIdCheckList.id)}
                        >
                            Preview
                        </Button>
                    </CellContentMyList>
                </MyCheckListCell>
            </Table.Row>
        </>
    )
}
