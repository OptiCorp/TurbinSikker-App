import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { CheckListEntity } from '../../context/models/CheckListEntity'

import { assignment_user } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'
import { AllWorkFlows, WorkFlow } from '../workflow/context/workFlowContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'

interface CheckListRowProps {
    allWorkFlow: AllWorkFlows
}

export const CheckListUserRow: FunctionComponent<CheckListRowProps> = ({
    allWorkFlow
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

  
const navigate  = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/PreviewCheckList/${id}`)
    }
const {currentUser} = useUserContext()


const [checklistData, setChecklistData] = useState<CheckListEntity | null>()

const [date, setDate] = useState<string>()
const [updateDate, setUpdateDate] = useState<string>()
const [name, setName] = useState<string>()

useEffect(() => {
    const fetchChecklistData = async () => {


        
    
        try {
            const res = await fetch(
                `https://localhost:7290/api/GetChecklist?id=${allWorkFlow.checklistId}`
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
}, [allWorkFlow, currentUser])
    

useEffect(() => {
    if (!allWorkFlow.userId) return 
const getUserName = async () => {
    try {
        const res = await fetch(`https://localhost:7290/api/GetUser?id=${allWorkFlow.userId}`);
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status);
        const data = await res.json() as UserEntity;
        setName(data.firstName +` ` + data.lastName);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

    getUserName()
}, [allWorkFlow.userId, currentUser])


    return (
        <> 
         {checklistData?.user.id === currentUser?.id && checklistData?.status === 'Active' && (
            <StyledTableRow onClick={() => clickHandler(allWorkFlow.checklistId)}>
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
                                justifyContent: 'center',
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
                            style={{ gridRow: '3/3' }}
                        >
                             {name}

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
   {formatDate(allWorkFlow.updatedDate)}</Typography>
                       
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {allWorkFlow.status === null ? (
                           <StyledChip variant="error">Not yet delivered</StyledChip> 
                        ) : (
                            <StyledChip variant="active">Ready for Review</StyledChip>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                            style={{ gridRow: '3/3' }}
                        >
                 
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>  )}
        </>
    )
}
