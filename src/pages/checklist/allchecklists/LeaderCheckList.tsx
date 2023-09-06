import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { useUserContext } from '../../users/context/userContextProvider'
import { StyledTableRow } from '../checkListID/styles'

import { AllWorkFlows } from '../workflow/types'
import { ChipStatus } from './chipStatus'
import { useGetCheckListInfo } from './hooks/UseGetCheckListInfo'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

interface CheckListRowProps {
    workflow: AllWorkFlows
}

export const LeaderCheckListSend: FunctionComponent<CheckListRowProps> = ({
    workflow,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }
    const { currentUser } = useUserContext()

    const { checklistData, userData, name, date } = useGetCheckListInfo(
        workflow.checklistId,
        workflow.userId
    )

    // const { refreshList, setRefreshList } = useCheckListContext()

    //     fetchChecklistData()
    // }, [allWorkFlow, refreshList, currentUser, accessToken])

    // }, [allWorkFlow.userId, accessToken])
    if (currentUser?.id !== workflow.createdById || workflow.status !== 1)
        return null
    return (
        <>
            <StyledTableRow onClick={() => clickHandler(workflow.checklistId)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        {checklistData && (
                            <Typography
                                variant="body_long_bold"
                                token={{ fontSize: '0.9rem' }}
                            >
                                {checklistData.title}
                            </Typography>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                fontSize: '0.8rem',
                            }}
                            style={{ height: '5px', minWidth: '100px' }}
                        >
                            Created {date}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <StyledChip>
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
                                style={{ margin: '0' }}
                            >
                                {name}
                            </Typography>
                        </StyledChip>
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        <ChipStatus workflow={workflow} />
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.7rem',
                            }}
                        >
                            {formatDate(workflow.updatedDate)}
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>
        </>
    )
}
