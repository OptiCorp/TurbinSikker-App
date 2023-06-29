import { Table } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { ICheckList } from '../users/context/apiContextProvider'

import { CellContent, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    allCheckList: ICheckList
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
                    {allCheckList.title}
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {allCheckList.user.firstName}{' '}
                        {allCheckList.user.lastName}{' '}
                    </CellContent>
                    {formattedCreatedDateUser}
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    {formattedCreatedDate}
                </StyledTableCellCheckL>
            </Table.Row>
        </>
    )
}
