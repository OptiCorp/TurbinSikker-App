import { FunctionComponent, useState } from 'react'
import { ICheckListUserID } from '../../context/apiContextProvider'

import {
    Button,
    Checkbox,
    Chip,
    Icon,
    Typography,
} from '@equinor/eds-core-react'
import { assignment_user, calendar } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { CellContentMyList, MyCheckListCell, StyledRow, Test } from './styles'

interface CheckListRowProps {
    userIdCheckList: ICheckListUserID
    activeRow: boolean
    setActiveRow: (open: boolean) => void
}

export const CheckListUserIDRow: FunctionComponent<CheckListRowProps> = ({
    userIdCheckList,
    activeRow,
    setActiveRow,
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

    const [colorChange, setColorChange] = useState(false)

    return (
        <>
            <StyledRow colorChange={colorChange}>
                <MyCheckListCell>
                    <CellContentMyList>
                        <Test>
                            <Checkbox
                                name="multiple"
                                onChange={(e) => {
                                    setActiveRow(e.target.checked)
                                }}
                                onClick={() => setColorChange(!colorChange)}
                                style={{ padding: '0' }}
                            />
                            <Typography variant="body_short_bold">
                                {userIdCheckList.title}
                            </Typography>
                        </Test>
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
                        </Typography>
                        <Button
                            style={{
                                width: '55px',
                                fontSize: '0.8rem',
                                height: '25px',
                                margin: '0 auto',
                                gridRow: '3/3',
                            }}
                            variant="outlined"
                            onClick={() => clickHandler(userIdCheckList.id)}
                        >
                            view
                        </Button>
                    </CellContentMyList>
                </MyCheckListCell>
            </StyledRow>
        </>
    )
}
