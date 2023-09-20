import { useAddTaskForm } from '@components/addtasks/hooks/useAddTaskForm'
import CustomDialog from '@components/modal/useModalHook'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Typography } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { API_URL } from '../../../config'
import {
    CheckListContextProvider,
    useCheckListContext,
} from '../../../pages/context/CheckListContextProvider'
import { checkList } from '../../../pages/context/models/checklist'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { EditListPoints } from '../editchecklist/styles'
import { Wrapper } from '../previewCheckList/styles'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'
import { UpdatingWorkFlowEntity } from './types'

export const FillOutCheckList = () => {
    const { sortedTasks } = useAddTaskForm()

    const methods = useForm<UpdatingWorkFlowEntity>()
    const { WorkFlows } = useWorkflowContext()

    const [content, setContent] = useState('')
    const [commentDialogShowing, setCommentDialogShowing] = useState(false)
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)

    const { setRefreshList } = useCheckListContext()
    const { handleSubmit } = methods
    const { accessToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)

    const onUpdate: SubmitHandler<UpdatingWorkFlowEntity> = async (data: {
        id: string
        userId: string
        status: string
    }) => {
        const res = await fetch(`${API_URL}/UpdateWorkflow?id=${data.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                userId: data.userId,
                status: data.status,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)

        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onUpdate)} id="fill-out-checklist">
                    <div style={{ backgroundColor: '#f0f3f3' }}>
                        {
                            <div>
                                <AddPunchHeader>
                                    <StyledCard>
                                        <StyledCardHeader>
                                            <Typography
                                                onClick={() => setCommentDialogShowing(true)}
                                                token={{
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '0.8rem',
                                                    color: 'green',
                                                }}
                                                link
                                                href="#"
                                            >
                                                Add comment
                                            </Typography>
                                            <Typography
                                                onClick={() => setPunchDialogShowing(true)}
                                                token={{
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '0.8rem',
                                                    color: 'red',
                                                }}
                                                link
                                                href="#"
                                            >
                                                Add punch
                                            </Typography>
                                        </StyledCardHeader>
                                    </StyledCard>
                                </AddPunchHeader>
                            </div>
                        }
                        <Wrapper>
                            <CheckListContextProvider>
                                <FillOutList WorkFlow={WorkFlows} onUpdate={onUpdate} />
                            </CheckListContextProvider>
                        </Wrapper>
                        <CustomDialog
                            isOpen={commentDialogShowing}
                            negativeButtonOnClick={() => setCommentDialogShowing(false)}
                            title="Add comment?"
                            negativeButtonText="Cancel"
                            positiveButtonText="Save"
                            buttonVariant="ghost"
                        >
                            <Typography variant="text" token={{ textAlign: 'left' }}>
                                Comment will be added to the end of the form.
                            </Typography>
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
                            negativeButtonOnClick={() => setPunchDialogShowing(false)}
                            negativeButtonText="Cancel"
                            positiveButtonText="OK"
                            isOpen={punchDialogShowing}
                        >
                            <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                                You will be forwarded to Punch form. You will be able to continue
                                this form where you left after.
                            </Typography>
                        </CustomDialog>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
