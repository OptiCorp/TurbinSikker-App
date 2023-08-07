import { Chip, Table } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { CheckListEntity } from '../../../models/CheckListEntity'

import {
    CellContent,
    StyledChip,
    StyledTableCellCheckL,
    styledChip,
} from './styles'

interface CheckListRowProps {
    allCheckList: CheckListEntity
}

export const CheckListUserRow: FunctionComponent<CheckListRowProps> = ({
    allCheckList,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    const formattedCreatedDate = formatDate(allCheckList.createdDate)
    const formattedCreatedDateUser = formatDate(allCheckList.user.createdDate)
    return (
        <>
            <Table.Row>
                <StyledTableCellCheckL>
                    <CellContent> {allCheckList.title} </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {allCheckList.user.firstName}
                        {allCheckList.user.lastName}
                    </CellContent>{' '}
                    <CellContent>{formattedCreatedDateUser} </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent> {formattedCreatedDate} </CellContent>

                    {allCheckList.status === 'Active' ? (
                        <StyledChip variant="active">Active</StyledChip>
                    ) : (
                        <StyledChip variant="error">Inactive</StyledChip>
                    )}
                </StyledTableCellCheckL>
            </Table.Row>
        </>
    )
}
