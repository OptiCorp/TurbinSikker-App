import { FunctionComponent, useEffect, useState } from 'react'

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

import { Controller } from 'react-hook-form'
import {
    ChecklistTaskInfo,
    TaskInfos,
    WorkflowResponse,
} from '../../services/apiTypes'

import { useFillChecklistForm } from './hooks/useFillChecklist'
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

export type FillOutListProps = {
    workflow: WorkflowResponse
    tasks: ChecklistTaskInfo[]
    taskInfo: TaskInfos
}

export const FillOutList: FunctionComponent<FillOutListProps> = ({
    tasks,
    workflow,
    taskInfo,
}) => {
    const { workflowId } = useParams() as { workflowId: string }
    const navigate = useNavigate()
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [completionTime, setCompletionTime] = useState<number>()
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)
    const [taskIdd, setTaskIdd] = useState('')
    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskIdd}/addpunch`)
    }

    const { control, methods } = useFillChecklistForm()

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked === true) return
        methods.setValue(`taskInfos.[0]`, 'Finished')
    }, [taskInfo])
    console.log(taskInfo)
    return (
        <>
            <>
                <FillOutWrap>
                    {tasks.map((task) => {
                        return (
                            <CustomCard key={task.id}>
                                <Card.Header
                                    style={{
                                        filter:
                                            taskInfo[task.id] ===
                                            'NotApplicable'
                                                ? 'blur(3px)'
                                                : 'none',
                                    }}
                                >
                                    <CustomCategoryName>
                                        {task.category.name}
                                    </CustomCategoryName>

                                    <Typography
                                        onClick={() => {
                                            setTaskIdd(task.id)
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
                                            control={control}
                                            name={'taskInfos'}
                                            render={({ field }) => (
                                                <StyledSwitch
                                                    size="small"
                                                    label="N/A?"
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => {
                                                        field
                                                    }}
                                                />
                                            )}
                                        />
                                    </NotApplicableWrap>

                                    <CustomTaskField
                                        style={{
                                            filter:
                                                checked === true
                                                    ? 'blur(3px)'
                                                    : 'none',
                                        }}
                                        label={''}
                                        key={task.id}
                                        id="storybook-multi-readonly"
                                        name="task"
                                        defaultValue={task.description}
                                        multiline
                                        rows={4}
                                        readOnly
                                    />
                                </CustomCardContent>
                                <SubmitErrorContainer>
                                    <>
                                        {checked === true ? (
                                            <ImageContainer />
                                        ) : (
                                            <>
                                                <Controller
                                                    control={control}
                                                    name={`taskInfos.${task.id}`}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            label={''}
                                                            name={`taskInfos.${task.id}`}
                                                            id={`checkbox-${task.id}`}
                                                            // checked={field.value === 1}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target
                                                                        .checked
                                                                        ? 1
                                                                        : 0
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            </>
                                        )}
                                    </>
                                </SubmitErrorContainer>
                                {/* // {checked === 0 && <Error>Required</Error>}</> */}
                            </CustomCard>
                        )
                    })}
                </FillOutWrap>
            </>

            <NavActionsComponent
                buttonColor="primary"
                as="button"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setSubmitDialogShowing(true)}
                isShown={true}
                ButtonMessage="Clear"
                type="button"
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
                            htmlFor="textfield-normal"
                            label="Completion time (minutes):"
                        />
                        <Input
                            id="textfield-normal"
                            type="number"
                            autoComplete="off"
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>
                            ) => {
                                const inputElement =
                                    e.target as HTMLInputElement
                                setCompletionTime(inputElement.valueAsNumber)
                            }}
                        />
                    </div>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            setSubmitDialogShowing(false)
                        }}
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
    )
}
