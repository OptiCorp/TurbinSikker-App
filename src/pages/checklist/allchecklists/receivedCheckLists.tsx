import { Banner, Button, Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { CheckListEntity } from 'src/models/CheckListEntity'
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
    const [checklistTitle, setChecklistTitle] = useState<string>('')
    const [checklistData, setChecklistData] = useState<CheckListEntity | null>(
        null
    )

    useEffect(() => {
        const fetchChecklistTitle = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetChecklist?id=${checklistWorkFlow.checklistId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = await res.json()

                setChecklistData(data)
            } catch (error) {
                console.error('Error fetching checklist title:', error)
            }
        }

        fetchChecklistTitle()
    }, [checklistWorkFlow])

    const formattedUpdatedDate = formatDate(checklistWorkFlow.updatedDate)
    // const formattedCreatedDate = formatDate(allCheckList.createdDate)
    // const formattedCreatedDateUser = formatDate(allCheckList.user.createdDate)
    const navigate = useNavigate()
    console.log(checklistWorkFlow)
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }

    return (
        <>
            {checklistData && (
                <StyledTableRow onClick={() => clickHandler('test')}>
                    <StyledTableCellCheckL>
                        <CellContent>
                            <Typography variant="body_short_bold">
                                {checklistData.title}
                            </Typography>
                        </CellContent>
                    </StyledTableCellCheckL>
                    <StyledTableCellCheckL>
                        <CellContent>
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            {checklistData.user?.username}
                            <Typography
                                variant="caption"
                                token={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                }}
                                style={{ gridRow: '3/3' }}
                            >
                                {formattedUpdatedDate}
                            </Typography>{' '}
                        </CellContent>
                    </StyledTableCellCheckL>
                    <StyledTableCellCheckL>
                        <CellContent>
                            {checklistWorkFlow.status === 'Active' ? (
                                <StyledChip variant="active">Active</StyledChip>
                            ) : (
                                <StyledChip variant="error">
                                    Inactive
                                </StyledChip>
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
                            </Typography>
                        </CellContent>
                    </StyledTableCellCheckL>
                </StyledTableRow>
            )}
        </>
    )
}
