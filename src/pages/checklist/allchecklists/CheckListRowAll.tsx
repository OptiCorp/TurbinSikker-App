import { Chip, Icon, Typography } from '@equinor/eds-core-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { CheckListEntity } from '../../context/models/CheckListEntity'

import { assignment_user, wrap_text } from '@equinor/eds-icons'
import { useNavigate } from 'react-router'
import { StyledTableRow } from '../checkListID/styles'
import { CellContent, StyledChip, StyledTableCellCheckL } from './styles'

import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { AllWorkFlows } from '../workflow/context/models/AllWorkFlowEntity'

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
const { refreshList, setRefreshList } = useCheckListContext()
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
}, [allWorkFlow, currentUser, refreshList])
    

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
         {/* {checklistData?.user.id === currentUser?.id && checklistData?.status === 'Active' && ( */}
            <StyledTableRow onClick={() => clickHandler(allWorkFlow.checklistId)}>
                <StyledTableCellCheckL>
                    <CellContent>
                        <Typography variant="body_long_bold">
                        {checklistData?.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            token={{
                               
                                fontSize: '1em',
                            }} style={{height:'0px', minWidth:'100px'}}
                           
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
                                style={{ height: '15px',}}
                            /> 
                
                        <Typography
                            variant="caption"
                            token={{
                             
                                fontSize: '1rem' 
                            }} style={{  height:'1rem'}}
                           
                        >
                             {name}

                             </Typography>
                        </StyledChip>

                             <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '1em',
                            
                            }}
                        style={{height:'5px', minWidth:'100px'}}
                        >
   {formatDate(allWorkFlow.updatedDate)}</Typography>
                       
                    </CellContent>
                </StyledTableCellCheckL>
                <StyledTableCellCheckL>
                    <CellContent>
                        {allWorkFlow.status === null ? (
                           <Chip style={{margin:'0 auto'}} variant="error">Waiting</Chip> 
                        ) : (
                            <Chip variant="active">Ready for Review</Chip>
                        )}
                        <Typography
                            variant="caption"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',
                            }}
                           
                        >
                 
                        </Typography>
                    </CellContent>
                </StyledTableCellCheckL>
            </StyledTableRow>  
        </>
    )
}
