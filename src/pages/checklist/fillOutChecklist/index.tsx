import { TaskCategoryContextProvider } from "@components/addtasks/context/addTaskCategoryContextProvider"
import { useAddTaskForm } from "@components/addtasks/hooks/useAddTaskForm"
import { NavActionsComponent } from "@components/navigation/hooks/useNavActionBtn"
import { Card, Typography, Button } from "@equinor/eds-core-react"
import { useNavigate, useParams } from "react-router"
import { PreviewList } from "../previewCheckList/PreviewList"
import { InfoHeader, Wrapper } from "../previewCheckList/styles"
import { EditList } from "../editchecklist/EditList/EditList"
import { AddPunchHeader, StyledCard, StyledCardHeader } from "./styles"
import { FillOutList } from "./FillOutList"

export const FillOutCheckList = () => {
    // const clickHandler = (id: string) => {
    //     navigate(`/EditCheckList/${id}`)
    // }
    const { checkListId, sortedTasks } = useAddTaskForm()
    const navigate = useNavigate()
    const {id} = useParams()
    return (
        <>
       
                <div style={{ backgroundColor: '#f0f3f3' }}>
                    {checkListId && (
                        <div key={checkListId.id}>
                            <AddPunchHeader>
                                <StyledCard>
                                    <StyledCardHeader
                                    >
                                      <Typography
                            variant="drawer_active"
                            group="navigation"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem', color:'green'
                            }}
                   
                        >
                          Add comment
                        </Typography>
                        <Typography
                            variant="drawer_active"
                            group="navigation"
                            token={{
                                textAlign: 'center',
                                fontSize: '0.8rem',color:'red'
                            }}
                       
                        >
                          Add punch
                        </Typography>
                                    </StyledCardHeader>
                                </StyledCard>
                            </AddPunchHeader>
                          
                        </div>
                    )}
                            <Wrapper>
                                <FillOutList
                                key={checkListId?.id}
                                tasks={checkListId}
                                sortedTasks={sortedTasks}
                            />
                        </Wrapper>


                    {checkListId && (
                        <NavActionsComponent
                            buttonColor="primary"
                            secondButtonColor="primary"
                            buttonVariant="outlined"
                            // onClick={() => clickHandler(checkListId.id)}
                            isShown={true}
                            ButtonMessage="Clear"
                            SecondButtonMessage="Submit"
                        />
                    )}
                </div>
        
        </>
    )
}
