import { FunctionComponent, useState } from 'react'

import { Card, Checkbox, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_drop_down } from '@equinor/eds-icons'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/useNavActionBtn'

import apiService from '../../services/api'
import {
    CustomCard,
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    FillOutWrap,
    ImageContainer,
    NotApplicableWrap,
    StyledSwitch,
    Test,
    Warning,
} from './styles'
import { FillOutListProps } from './types'

interface NaStatus {
    [taskId: string]: boolean
}

interface CheckboxStatus {
    [taskId: string]: boolean
}

export const FillOutList: FunctionComponent<FillOutListProps> = ({
    tasks,
    workflow,
}) => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})

    const { workflowId } = useParams() as { workflowId: string }

    const [punchDialogShowing, setPunchDialogShowing] = useState(false)
    const navigate = useNavigate()
    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskId}/addpunch`)
    }
    const [taskId, setTaskId] = useState('')
    const [naStatus, setNaStatus] = useState<NaStatus>({})

    const [checkboxStatus, setCheckboxStatus] = useState<CheckboxStatus>(
        Object.fromEntries(tasks.map((x) => [x.id, false]))
    )

    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(false)

    const areAllCheckboxesChecked = tasks.every(
        (task) => checkboxStatus[task.id]
    )

    const api = apiService()
    const handleSubmit = async () => {
        if (areAllCheckboxesChecked)
            try {
                await api.updateWorkflow(workflowId, 'Done', workflow.user.id)
            } catch (error) {
                console.log(error)
            }
        else {
            setIsSubmissionAllowed(true)
        }
    }
    const handleError = () => {
        if (isSubmissionAllowed) {
            return (
                <div
                    style={{
                        margin: '0',
                        display: 'flex',
                        color: 'red',
                        fontSize: '1rem',
                        height: '10px',
                        width: '10px',
                    }}
                >
                    required
                </div>
            )
        }
        return null
    }

    return (
        <>
            {tasks.map((task) => (
                <>
                    <FillOutWrap key={task.id}>
                        <CustomCard>
                            <Card.Header
                                style={{
                                    filter: applicableStatuses[task.id]
                                        ? 'blur(3px)'
                                        : 'none',
                                }}
                            >
                                <CustomCategoryName>
                                    {task.category.name}
                                </CustomCategoryName>
                                <Typography
                                    onClick={() => {
                                        setTaskId(task.id)
                                        setPunchDialogShowing(true)
                                    }}
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
                            </Card.Header>
                            <CustomCardContent>
                                <NotApplicableWrap>
                                    <StyledSwitch
                                        size="small"
                                        label="N/A?"
                                        type="checkbox"
                                        value={[task.id] || false}
                                        checked={
                                            applicableStatuses[task.id] || false
                                        }
                                        onChange={(e) => {
                                            setApplicableStatuses((prev) => ({
                                                ...prev,
                                                [task.id]: e.target.checked,
                                            }))

                                            e.target.checked
                                                ? 'Active'
                                                : 'Disabled'
                                        }}
                                    />
                                </NotApplicableWrap>
                                <CustomTaskField
                                    style={{
                                        filter: applicableStatuses[task.id]
                                            ? 'blur(3px)'
                                            : 'none',
                                    }}
                                    label={''}
                                    key={task.id}
                                    id="storybook-multi-readonly"
                                    name="task"
                                    defaultValue={task.description}
                                    multiline
                                    rows={3}
                                    readOnly
                                    helperText={
                                        task.description.length > 80
                                            ? 'see more'
                                            : '  '
                                    }
                                    helperIcon={
                                        task.description.length > 100 ? (
                                            <Icon
                                                data={arrow_drop_down}
                                                height={30}
                                                color="#007079"
                                                title="arrow_drop_down"
                                            />
                                        ) : null
                                    }
                                />{' '}
                            </CustomCardContent>

                            {applicableStatuses[task.id] ? (
                                <ImageContainer />
                            ) : (
                                <Test>
                                    <Checkbox
                                        label={''}
                                        name={`task.${task.id}`}
                                        id={`checkbox-${task.id}`}
                                        checked={
                                            checkboxStatus[task.id] || false
                                        }
                                        onChange={(e) => {
                                            setCheckboxStatus((prev) => ({
                                                ...prev,
                                                [task.id]: e.target.checked,
                                            }))
                                        }}
                                    />{' '}
                                    {!checkboxStatus[task.id] &&
                                    isSubmissionAllowed ? (
                                        <Warning> required</Warning>
                                    ) : (
                                        ''
                                    )}
                                </Test>
                            )}
                        </CustomCard>
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
                        SecondButtonMessage="Submit"
                    />
                </>
            ))}
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
            <CustomDialog
                title={`Submit ${workflow.checklist.title}?`}
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="Submit"
                positiveButtonOnClick={() => {
                    setSubmitDialogShowing(false)
                    handleSubmit()
                }}
                isOpen={submitDialogShowing}
            ></CustomDialog>
        </>
    )
}
