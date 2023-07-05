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
    const formatDate = (dateString: string) => {
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
                        <Typography
                            group="table"
                            variant="cell_numeric_monospaced"
                            token={{
                                fontWeight: 300,
                                textAlign: 'left',
                            }}
                        >
                            {formattedCreatedDate}
                        </Typography>
                        <Chip>
                            <Icon data={assignment_user} />
                            submitted to 0 inspectors
                        </Chip>
                    </CellContentMyList>
                </MyCheckListCell>
                <MyCheckListCell>
                    <Chip variant="active" style={{ margin: '0 auto' }}>
                        {' '}
                        {userIdCheckList.status}
                    </Chip>
                </MyCheckListCell>

                <MyCheckListCell>
                    <Typography
                        group="input"
                        variant="label"
                        token={{
                            fontStyle: 'italic',
                            textAlign: 'center',
                        }}
                    >
                        {formattedUpdatedDate}
                        <Icon data={timer} size={16} />
                    </Typography>
                    <Button
                        style={{
                            width: '55px',
                            fontSize: '0.8rem',
                            height: '25px',
                            margin: '0 auto',
                        }}
                        color="primary"
                        onClick={() => clickHandler(userIdCheckList.id)}
                    >
                        Preview
                    </Button>
                </MyCheckListCell>
            </Table.Row>
        </>
    )
}
