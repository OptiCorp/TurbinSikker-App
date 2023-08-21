import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'

import { CheckListEntity } from 'src/models/CheckListEntity'

import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    checklistWorkFlow: IWorkFlow
}
type IWorkFlow = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    updatedDate: string
}
export const ReceivedCheckLists: FunctionComponent<CheckListRowProps> = ({
    checklistWorkFlow,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    const formattedUpdatedDate = formatDate(checklistWorkFlow.updatedDate)

    const navigate = useNavigate()

    const clickHandler = (id: string | undefined) => {
        navigate(`/PreviewCheckList/${id}`)
    }
    const [checklistData, setChecklistData] = useState<CheckListEntity | null>()

    const [date, setDate] = useState<string>()

    useEffect(() => {
        const fetchChecklistData = async () => {
            console.log(checklistWorkFlow)
            if (!checklistWorkFlow.checklistId) return
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetChecklist?id=${checklistWorkFlow.checklistId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = await res.json()

                setChecklistData(data)
                setDate(formatDate(data.createdDate))
            } catch (error) {
                console.error('Error fetching checklist data:')
            }
        }

        fetchChecklistData()
    }, [])

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(checklistData?.id)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_short_bold">
                            {checklistData?.title}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Chip
                            style={{
                                minWidth: '120px',
                                display: 'flex',

                                alignContent: 'center',
                            }}
                        >
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{ height: '15px' }}
                            />
                            <Typography
                                variant="caption"
                                token={{
                                    fontSize: '0.8rem',
                                }}
                                style={{}}
                            >
                                {checklistData?.user.firstName}{' '}
                                {checklistData?.user.lastName}
                            </Typography>
                        </Chip>
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                            {date}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {checklistWorkFlow.status === 0 ? (
                            <StyledChip variant="active">Received</StyledChip>
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
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
