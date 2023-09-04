
import { useAddTaskForm } from "@components/addtasks/hooks/useAddTaskForm"
import { NavActionsComponent } from "@components/navigation/hooks/useNavActionBtn"
import { Typography } from "@equinor/eds-core-react"
import { useNavigate } from "react-router"
import { Wrapper } from "../previewCheckList/styles"
import { AddPunchHeader, StyledCard, StyledCardHeader } from "./styles"
import { FillOutList } from "./FillOutList"
import {  FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useContext, useState } from "react"
import CustomDialog from "@components/modal/useModalHook"
import { EditListPoints } from "../editchecklist/styles"
import { checkList } from "../../../pages/context/models/checklist"
import { SnackbarContext } from "@components/snackbar/SnackBarContext"
import useAuth from "../../../pages/landingPage/context/LandingPageContextProvider"
import { useCheckListContext } from "../../../pages/context/CheckListContextProvider"
import { useWorkflowContext } from "../workflow/context/workFlowContextProvider"



export type UpdatingWorkFlowEntity = {
   id: string
status: number
checklistId: string
userId: string

  
}

export type PunchListEntity = {

punchDescription: string
checklistId: string
severity: string
createdDate: string
createdBy: string

}


export const FillOutCheckList = () => {
   
    const { checkListId, sortedTasks } = useAddTaskForm()
    const navigate = useNavigate()
    const methods = useForm<UpdatingWorkFlowEntity>()
    const { WorkFlows, allWorkFlows } = useWorkflowContext()
    
    const [content, setContent] = useState('')
    const [commentDialogShowing, setCommentDialogShowing] = useState(false)
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)

    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const { refreshList, setRefreshList } = useCheckListContext()
      const { handleSubmit, control} = methods
      const { idToken } = useAuth()
      const { openSnackbar } = useContext(SnackbarContext)


      
      const onUpdate: SubmitHandler<UpdatingWorkFlowEntity> = async (data: {
       id: string
       checklistId: string
       userId: string
       status: number
       
    })  => {

        const res = await fetch(
            `https://turbinsikker-api-lin-prod.azurewebsites.net/api/UpdateChecklistWorkflow?id=${data.id}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    checklistId: data.checklistId,
                    userId: data.userId,
                    status: data.status
                })
            }
        )
        if (res.ok) setRefreshList((prev) => !prev)
    
        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
    }
    

      
    return (
        <>
       <FormProvider {...methods}>
        <form  onSubmit={handleSubmit(onUpdate)} id="fill-out-checklist">
                <div style={{ backgroundColor: '#f0f3f3' }}>
                    {checkListId && (
                                            <div key={checkListId.id}>
                                                <AddPunchHeader>
                                                    <StyledCard>
                                                        <StyledCardHeader
                                                        > <Typography
                                                        onClick={() => setCommentDialogShowing(true)}
                                                        token={{
                                                            textAlign: 'center',  fontWeight: 600,
                                                            fontSize: '0.8rem',color:'green'
                                                        }}
                                                        link href="#"
                                                    >
                                                        
                                            Add comment
                                            </Typography>
                                            <Typography
                                            onClick={()=> setPunchDialogShowing(true)}
                                                token={{
                                                    textAlign: 'center',  fontWeight: 600,
                                                    fontSize: '0.8rem',color:'red'
                                                }}
                                                link href="#"
                                            >
                                            Add punch
                                            </Typography>
                                                        </StyledCardHeader>
                                                    </StyledCard>
                                                </AddPunchHeader>
                                            
                                            </div>
                    )}
                                <Wrapper>
                                {WorkFlows.map((WorkFlow) => (
                                    <FillOutList
                                    key={checkList?.id}
                                    WorkFlow={WorkFlow}
                                    tasks={checkListId}
                                    sortedTasks={sortedTasks}
                                    onUpdate={onUpdate}
                                />   ))}
                            </Wrapper>

                        <CustomDialog
                isOpen={commentDialogShowing}
                negativeButtonOnClick={() => setCommentDialogShowing(false)}
                title="Add comment?"
                negativeButtonText="Cancel"
                positiveButtonText="Save"
                buttonVariant="ghost"
                
                            >    <Typography
                            variant="text"
                            token={{ textAlign: 'left' }}
                        >
                        Comment will be added to the end of the form.</Typography>
                <EditListPoints
                    label=""
                    key={checkList.id ?? ''}
                    id="storybook-multi-readonly"
                   
                    multiline
                    rows={5}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(event.target.value)
                    }}
                />
            </CustomDialog>


            <CustomDialog
                            title="Make Punch?"
                            buttonVariant="ghost"
                            negativeButtonOnClick={()=> setPunchDialogShowing(false)}
                            negativeButtonText="Cancel"
                            positiveButtonText="OK"
                           
                            isOpen={punchDialogShowing}
                        >
       <Typography
            group="input"
            variant="text"
            token={{ textAlign: 'left' }}
        >
You will be forwarded to Punch form. You will be able to continue this form where you left after.</Typography>
                        </CustomDialog>

                        {/* <CustomDialog
                            title="Submit form?"
                            buttonVariant="ghost"
                            negativeButtonOnClick={()=> setSubmitDialogShowing(false)}
                            negativeButtonText="Cancel"
                            positiveButtonText="OK"
                            // positiveButtonOnClick={() => {
                            //     if (changeTitle) {
                            //         setTitle(changeTitle)
                            //     }
                            //     setDialogShowing(false)
                            // }}
                            isOpen={submitDialogShowing}
                        > </CustomDialog>

                        <NavActionsComponent
                            buttonColor="primary"
                            secondButtonColor="primary"
                            
                            buttonVariant="outlined"
                          secondOnClick={()=> setSubmitDialogShowing(true)}
                            isShown={true}
                            ButtonMessage="Clear"
                            SecondButtonMessage="Submit"
                        /> */}
                    
                     
                </div>
                </form></FormProvider>
        </>
    )
}
