import { FunctionComponent } from 'react'

import {
    Button,
    Dialog,
    Input,
    Label,
    Typography,
} from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/useNavActionBtn'

import {
    DeepMap,
    FieldError,
    FieldValues,
    useFormContext,
} from 'react-hook-form'
import { WorkflowResponse } from '../../services/apiTypes'

import { FillOutChecklistForm } from './hooks/types'

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
    DeepMap<TFieldValues, FieldError>

export type DialogProps = {
    workflow: WorkflowResponse
    setSubmitDialogShowing: (submitDialogShowing: boolean) => void
    submitDialogShowing: boolean
    setPunchDialogShowing: (punchDialogShowing: boolean) => void
    punchDialogShowing: boolean
    taskId?: string
}

export const DialogInspector: FunctionComponent<DialogProps> = ({
    workflow,
    setSubmitDialogShowing,
    submitDialogShowing,
    setPunchDialogShowing,
    punchDialogShowing,
    taskId,
}) => {
    const { workflowId } = useParams() as { workflowId: string }
    const navigate = useNavigate()

    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskId}/addpunch`)
    }

    // const [inspectorSubmitDialog, setInspectorSubmitDialog] = useState(false)
    // useEffect(() => {
    //     if (submitDialogShowing === true) setInspectorSubmitDialog(true)
    //     else if (submitDialogShowing === false) setInspectorSubmitDialog(false)
    // }, [submitDialogShowing])

    const methods = useFormContext<FillOutChecklistForm>()

    return (
        <>
            <NavActionsComponent
                buttonColor="primary"
                as="button"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setSubmitDialogShowing(true)}
                isShown={true}
                ButtonMessage="Clear"
                type="button"
                primaryType="button"
                onClick={() => {
                    methods.reset()
                }}
                SecondButtonMessage="Submit"
            />
            <CustomDialog
                title="Make Punch?"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setPunchDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                positiveButtonOnClick={() => {
                    createPunch()
                }}
                isOpen={punchDialogShowing}
            >
                <Typography
                    group="input"
                    variant="text"
                    token={{ textAlign: 'left' }}
                >
                    You will be forwarded to Punch form. You will be able to
                    continue this form where you left after.
                </Typography>
            </CustomDialog>

            <Dialog
                open={submitDialogShowing}
                onClose={() => setSubmitDialogShowing(false)}
                isDismissable
            >
                <Dialog.Header>
                    <Dialog.Title>
                        Submit
                        {workflow.checklist.title}?
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography style={{ marginBottom: '10px' }}>
                        This will commit {workflow.checklist.title} to
                        {workflow.creator.username}
                    </Typography>
                    <div>
                        <Label
                            htmlFor="completionTimeMinutes"
                            label="Completion time (minutes):"
                        />
                        <Input
                            id="completionTimeMinutes"
                            type="number"
                            autoComplete="off"
                            {...methods.register('completionTimeMinutes', {
                                valueAsNumber: true,
                                required: 'This is required.',
                            })}
                        />
                    </div>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="submit"
                        form="fill-checklist"
                        id="fill-checklist"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setSubmitDialogShowing(false)}
                    >
                        Cancel
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}
