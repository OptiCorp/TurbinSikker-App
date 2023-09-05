import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { StyledTableRow } from '../checkListID/styles'
import { WorkFlow } from '../workflow/context/models/WorkFlowEntity'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    WorkFlow: WorkFlow
}

export const InspectorReceivedCheckLists: FunctionComponent<
    CheckListRowProps
> = ({ WorkFlow }) => {
    // const formatDate = (dateString: string) => {
    //     const date = new Date(dateString)
    //     return date.toLocaleDateString('en-GB')
    // }

    const navigate = useNavigate()

    const clickHandler = (id: string | undefined) => {
        navigate(`/FillOutCheckList/${id}`)
    }
    const { currentUser } = useUserContext()
    const [checklistData, setChecklistData] = useState<CheckListEntity>()

    // const formattedCreatedDate = formatDate(WorkFlow.checklist.createdDate)

    // const formattedUpdatedDate = WorkFlow.formattedUpdateDate
    //     ? formatDate(WorkFlow.formattedUpdateDate)
    //     : 'N/A'

    useEffect(() => {
        const fetchChecklistData = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetChecklist?id=${WorkFlow.checklistId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as CheckListEntity

                setChecklistData(data)
            } catch (error) {
                console.error('Error fetching checklist data:')
            }
        }

        fetchChecklistData()
        console.log(WorkFlow.checklistId)
    }, [WorkFlow, currentUser])

    return (
        <>
            <StyledTableRow onClick={() => clickHandler(WorkFlow.checklistId)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        {checklistData && (
                            <Typography variant="body_short_bold">
                                {checklistData.title}
                            </Typography>
                        )}
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Chip
                            style={{
                                minWidth: '120px',
                                display: 'flex',
                                justifyContent: 'center',

                                alignContent: 'center',
                                margin: '0 auto',
                            }}
                        >
                            <Icon
                                data={assignment_user}
                                color="#243746"
                                style={{
                                    height: '15px',
                                }}
                            />
                            <Typography
                                variant="caption"
                                token={{
                                    fontSize: '0.8rem',
                                }}
                                style={{}}
                            >
                                {WorkFlow?.createdById}
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
                            {/* {formattedCreatedDate} */}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {WorkFlow.status === null ? (
                            <StyledChip variant="active">
                                Not yet Completed
                            </StyledChip>
                        ) : (
                            <StyledChip variant="error">Inactive</StyledChip>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                        >
                            {WorkFlow.formattedUpdateDate}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
