import CustomDialog from '@components/modal/useModalHook'
import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { checkList } from '../../../pages/context/models/checklist'
import { EditListPoints } from '../editchecklist/styles'
import { Wrapper } from '../previewCheckList/styles'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { useFillOutCheckList } from './FillOutCheckListHook'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'

export const FillOutCheckList = () => {
    const { workFlowById } = useWorkflowContext()

    const [content, setContent] = useState('')
    const [commentDialogShowing, setCommentDialogShowing] = useState(false)
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)

    const { methods, onUpdate } = useFillOutCheckList()
    const { handleSubmit } = methods

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onUpdate)} id="fill-out-checklist">
                    <div style={{ backgroundColor: '#f0f3f3' }}>
                        <div>
                            <AddPunchHeader>
                                <StyledCard>
                                    <StyledCardHeader>
                                        <Typography
                                            onClick={() =>
                                                setCommentDialogShowing(true)
                                            }
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
                                            onClick={() =>
                                                setPunchDialogShowing(true)
                                            }
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

                        <Wrapper>
                            {workFlowById?.checklist?.checklistTasks.map(
                                (task) => (
                                    <>
                                        <FillOutList
                                            key={task.id}
                                            workFlowById={workFlowById}
                                            onUpdate={onUpdate}
                                            task={task} // tasks={workFlowById.checklist.checklistTasks}
                                        />
                                    </>
                                )
                            )}
                        </Wrapper>
                        <CustomDialog
                            isOpen={commentDialogShowing}
                            negativeButtonOnClick={() =>
                                setCommentDialogShowing(false)
                            }
                            title="Add comment?"
                            negativeButtonText="Cancel"
                            positiveButtonText="Save"
                            buttonVariant="ghost"
                        >
                            <Typography
                                variant="text"
                                token={{ textAlign: 'left' }}
                            >
                                Comment will be added to the end of the form.
                            </Typography>
                            <EditListPoints
                                label=""
                                key={checkList.id ?? ''}
                                id="storybook-multi-readonly"
                                multiline
                                rows={5}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setContent(event.target.value)
                                }}
                            />
                        </CustomDialog>

                        <CustomDialog
                            title="Make Punch?"
                            buttonVariant="ghost"
                            negativeButtonOnClick={() =>
                                setPunchDialogShowing(false)
                            }
                            negativeButtonText="Cancel"
                            positiveButtonText="OK"
                            isOpen={punchDialogShowing}
                        >
                            <Typography
                                group="input"
                                variant="text"
                                token={{ textAlign: 'left' }}
                            >
                                You will be forwarded to Punch form. You will be
                                able to continue this form where you left after.
                            </Typography>
                        </CustomDialog>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
