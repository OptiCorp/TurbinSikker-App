import { FunctionComponent } from 'react'
import { ICheckListUserID } from '../../context/apiContextProvider'

import { CellContent, StyledRow, StyledTableCellCheckL } from '../styles'
import { Button } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router'

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
            <StyledRow>
                <StyledTableCellCheckL>
                    {userIdCheckList.title}
                    <CellContent>submitted to 0 inspectors</CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    {formattedCreatedDate}
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    {formattedUpdatedDate}
                    <Button
                        color="primary"
                        onClick={() => clickHandler(userIdCheckList.id)}
                    ></Button>
                </StyledTableCellCheckL>
            </StyledRow>
        </>
    )
}
