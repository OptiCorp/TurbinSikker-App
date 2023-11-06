import { ChangeEvent, FunctionComponent, useState } from 'react'

import {
    Button,
    Card,
    Checkbox,
    Chip,
    Dialog,
    Input,
    Label,
    Typography,
} from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/useNavActionBtn'

import {
    Controller,
    DeepMap,
    FieldError,
    FieldValues,
    useFieldArray,
    useFormContext,
} from 'react-hook-form'
import { WorkflowResponse } from '../../services/apiTypes'

import useSnackBar from '../../components/snackbar/useSnackBar'
import { FillOutChecklistForm } from './hooks/types'
import {
    CustomCard,
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    FillOutWrap,
    ImageContainer,
    NotApplicableWrap,
    StyledSwitch,
    SubmitErrorContainer,
} from './styles'

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
    DeepMap<TFieldValues, FieldError>

export type FillOutListProps = {
    workflow: WorkflowResponse
    setSubmitDialogShowing: (submitDialogShowing: boolean) => void
    submitDialogShowing: boolean
}

export const FillOutList: FunctionComponent<FillOutListProps> = ({
    workflow,
    setSubmitDialogShowing,
    submitDialogShowing,
}) => {
    const { workflowId } = useParams() as { workflowId: string }
    const navigate = useNavigate()

    const [punchDialogShowing, setPunchDialogShowing] = useState(false)
    const [taskId, settaskId] = useState('')
    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskId}/addpunch`)
    }
    const { snackbar, setSnackbarText } = useSnackBar()

    const methods = useFormContext<FillOutChecklistForm>()

    const { formState: errors } = methods

    const { fields, update } = useFieldArray({
        control: methods.control,
        name: 'taskInfos',
    })

    return (
        <>
            <>
                <FillOutWrap>
                    {fields.map((field, index) => {
                        const task = workflow.checklist.checklistTasks.find(
                            (x) => x.id === field.taskId
                        )
                        if (!task) return
                        return (
                            <CustomCard key={task.id}>
                                <Card.Header>
                                    <CustomCategoryName>
                                        {task.category.name}
                                    </CustomCategoryName>

                                    <Typography
                                        onClick={() => {
                                            settaskId(task.id)
                                            setPunchDialogShowing(true)
                                        }}
                                        token={{
                                            textAlign: 'center',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            color: 'red',
                                            textDecoration: 'none',
                                        }}
                                        link
                                        href="#"
                                    >
                                        <Chip variant="error">Add punch</Chip>
                                    </Typography>
                                </Card.Header>
                                <CustomCardContent>
                                    <NotApplicableWrap>
                                        <Controller
                                            control={methods.control}
                                            name={`taskInfos.${index}.status`}
                                            render={({
                                                field: { value, onChange },
                                            }) => {
                                                return (
                                                    <StyledSwitch
                                                        size="small"
                                                        label="N/A?"
                                                        type="checkbox"
                                                        checked={
                                                            value ===
                                                            'NotApplicable'
                                                        }
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            onChange(
                                                                e.target.checked
                                                                    ? 'NotApplicable'
                                                                    : 'Unfinished'
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        />
                                    </NotApplicableWrap>

                                    <CustomTaskField
                                        label={''}
                                        key={task.id}
                                        id="storybook-multi-readonly"
                                        name="task"
                                        defaultValue={task.description}
                                        multiline
                                        style={{
                                            filter:
                                                field.status === 'NotApplicable'
                                                    ? 'blur(3px)'
                                                    : 'none',
                                        }}
                                        rows={4}
                                        readOnly
                                    />
                                </CustomCardContent>
                                {methods.formState.errors.taskInfos && (
                                    <div style={{ color: 'red' }}>
                                        {
                                            methods.formState.errors.taskInfos
                                                .message
                                        }
                                    </div>
                                )}
                                <SubmitErrorContainer>
                                    <Controller
                                        control={methods.control}
                                        name={`taskInfos.${index}.status`}
                                        rules={{
                                            required:
                                                field.status === 'Finished' ||
                                                'NotApplicable',
                                        }}
                                        render={({
                                            field: { value, onChange },
                                            fieldState: { error },
                                        }) => {
                                            return value === 'NotApplicable' ? (
                                                <ImageContainer />
                                            ) : (
                                                <Checkbox
                                                    disabled={
                                                        value ===
                                                        'NotApplicable'
                                                            ? true
                                                            : false
                                                    }
                                                    checked={
                                                        value === 'Finished'
                                                    }
                                                    onChange={(
                                                        e: ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        onChange(
                                                            e.target.checked
                                                                ? 'Finished'
                                                                : 'Unfinished'
                                                        )
                                                    }}
                                                />
                                            )
                                        }}
                                    />
                                    {}
                                </SubmitErrorContainer>
                            </CustomCard>
                        )
                    })}
                </FillOutWrap>

                <NavActionsComponent
                    buttonColor="primary"
                    as="button"
                    secondButtonColor="primary"
                    buttonVariant="outlined"
                    secondOnClick={() => setSubmitDialogShowing(true)}
                    isShown={true}
                    ButtonMessage="Clear"
                    type="button"
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
                            Submit {workflow.checklist.title}?
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.CustomContent>
                        <Typography style={{ marginBottom: '10px' }}>
                            This will commit {workflow.checklist.title} to{' '}
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
                                label
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
        </>
    )
}
