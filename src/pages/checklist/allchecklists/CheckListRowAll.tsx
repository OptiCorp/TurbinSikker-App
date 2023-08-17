import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { CheckListEntity } from '../../../models/CheckListEntity'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { ICheckListUserID } from 'src/models/CheckListUserIdEntity'
import { useApiContext } from '../../../pages/context/apiContextProvider'
import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

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

    const { checklistWorkFlow } = useApiContext()

    const formattedUpdatedDate = formatDate(allCheckList.updatedDate)
    const formattedCreatedDate = formatDate(allCheckList.createdDate)

    const navigate = useNavigate()

    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(allCheckList.id)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">
                            {allCheckList.title}
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
                        {allCheckList.status === 'Active' ? (
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
                            {formattedCreatedDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
