import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { CheckListEntity } from 'src/models/CheckListEntity'
import { ICheckListUserID } from 'src/models/CheckListUserIdEntity'
import { useApiContext } from 'src/pages/context/apiContextProvider'
import { StyledTableRow } from '../../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from '../styles'

interface RowProps {
    rowTitle: string
    openSelectedList?: (event: React.MouseEvent<HTMLButtonElement>) => void
    fNameRow: string
    lNameRow: string
    formattedUpdateDate: string
    formattedCreatedDate: string
}

const UserRow: React.FC<RowProps> = ({
    rowTitle,
    openSelectedList,
    fNameRow,
    lNameRow,
    formattedUpdateDate,
    formattedCreatedDate,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    const navigate = useNavigate()
    // const clickHandler = (id: string) => {
    //     navigate(`/PreviewCheckList/${id}`)
    // }

    return (
        <>
            <StyledTableRow onClick={openSelectedList}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">
                            {rowTitle}
                        </Typography>
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
                            {fNameRow} {lNameRow}
                        </Chip>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {formattedUpdateDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <> {status}</>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {formattedCreatedDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}

export default UserRow
