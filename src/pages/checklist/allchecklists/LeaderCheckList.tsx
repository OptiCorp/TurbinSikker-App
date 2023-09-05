import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { CheckListEntity } from '../../context/models/CheckListEntity'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

import { UserEntity } from 'src/pages/users/context/models/UserEntity'
import { useCheckListContext } from '../../context/CheckListContextProvider'
import { useUserContext } from '../../users/context/userContextProvider'
import { AllWorkFlows } from '../workflow/context/models/AllWorkFlowEntity'

interface CheckListRowProps {
    allWorkFlow: AllWorkFlows
}

export const LeaderCheckListSend: FunctionComponent<CheckListRowProps> = ({
    allWorkFlow,
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

    const [checklistData, setChecklistData] = useState<CheckListEntity>()
    const [userData, setUserData] = useState<UserEntity | null>(null)
    const [date, setDate] = useState<string>()
    const [updateDate, setUpdateDate] = useState<string>()
    const [name, setName] = useState<string>()
    const { refreshList, setRefreshList } = useCheckListContext()

    useEffect(() => {
        const fetchChecklistData = async () => {
            try {
                const res = await fetch(
                    `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetChecklist?id=${allWorkFlow.checklistId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as CheckListEntity

                setChecklistData(data)
                setDate(formatDate(data.createdDate))

                setUpdateDate(formatDate(data.updatedDate))
            } catch (error) {
                console.error('Error fetching checklist data:')
            }
        }

        fetchChecklistData()
    }, [allWorkFlow, refreshList, currentUser])

    useEffect(() => {
        const getUserName = async () => {
            try {
                const res = await fetch(
                    `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetUser?id=${allWorkFlow.userId}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as UserEntity

                setUserData(data)
                setName(data.firstName + ` ` + data.lastName)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        getUserName()
    }, [allWorkFlow.userId])

    const chipStatus = () => {
        switch (allWorkFlow.status) {
            case 0:
                return (
                    <Chip style={{ margin: '0 auto' }} variant="default">
                        in progress
                    </Chip>
                )
            case 1:
                return (
                    <Chip style={{ margin: '0 auto' }} variant="active">
                        Ready for review
                    </Chip>
                )

            case 2:
                return (
                    <Chip style={{ margin: '0 auto' }} disabled>
                        completed
                    </Chip>
                )

            default:
                return (
                    <Chip style={{ margin: '0 auto' }} variant="error">
                        pending
                    </Chip>
                )
        }
    }

    return (
        <>
            {currentUser?.id === allWorkFlow.createdById &&
                allWorkFlow.status === 1 && (
                    <StyledTableRow
                        onClick={() => clickHandler(allWorkFlow.checklistId)}
                    >
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

                                {/* <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            
                            }}
                        style={{height:'5px', minWidth:'100px'}}
                        >
   {formatDate(allWorkFlow.updatedDate)}</Typography> */}
                            </CellContent>
                        </StyledTableCellCheckL>
                        <StyledTableCellCheckL>
                            <CellContent>
                                {chipStatus()}
                                <Typography
                                    variant="caption"
                                    token={{
                                        textAlign: 'center',
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    {formatDate(allWorkFlow.updatedDate)}
                                </Typography>
                            </CellContent>
                        </StyledTableCellCheckL>
                    </StyledTableRow>
                )}
        </>
    )
}
