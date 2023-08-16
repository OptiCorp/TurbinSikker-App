import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { CheckListEntity } from '../../../models/CheckListEntity'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { ICheckListUserID } from 'src/models/CheckListUserIdEntity'
import { UserEntity } from 'src/models/UserEntity'
import { UserListEntity } from 'src/models/UserListEntity'
import {
    IWorkFlow,
    useApiContext,
} from '../../../pages/context/apiContextProvider'
import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    checklistWorkFlow: IWorkFlow
}

export const ReceivedCheckLists: FunctionComponent<CheckListRowProps> = ({
    checklistWorkFlow,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }
    const { currentUser } = useApiContext()

    const formattedUpdatedDate = formatDate(checklistWorkFlow.updatedDate)
    // const formattedCreatedDate = formatDate(allCheckList.createdDate)
    // const formattedCreatedDateUser = formatDate(allCheckList.user.createdDate)
    const navigate = useNavigate()

    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    return (
        <>
            <StyledTableRow onClick={() => clickHandler('test')}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">ff</Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Chip
                            style={{
                                paddingLeft: '0',
                                lineHeight: '0',
                                margin: '0 auto',
                            }}
                        >
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            ff
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
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {/* {currentUser?.checklistWorkFlow.status === 'Active' ? (
                            <StyledChip variant="active">Active</StyledChip>
                        ) : (
                            <StyledChip variant="error">Inactive</StyledChip>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {formattedUpdatedDate}
                        </Typography> */}
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
