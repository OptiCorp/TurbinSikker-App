import { FunctionComponent, useState } from 'react'

import { Card, Checkbox, Chip, Typography } from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/useNavActionBtn'

import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import {
    CustomCard,
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    Error,
    FillOutWrap,
    ImageContainer,
    NotApplicableWrap,
    StyledSwitch,
    SubmitErrorContainer,
} from './styles'
import { FillOutListProps } from './types'

interface NaStatus {
    [taskId: string]: boolean
}

interface CheckboxStatus {
    [taskId: string]: boolean
}

export const FillOutList: FunctionComponent<FillOutListProps> = ({ tasks, workflow }) => {
    const { openSnackbar, setRefreshList } = useGlobal()
    const { workflowId } = useParams() as { workflowId: string }
    const navigate = useNavigate()
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [applicableStatuses, setApplicableStatuses] = useState<Record<string, boolean>>({})
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)
    const [taskId, setTaskId] = useState('')
    const [checkboxStatus, setCheckboxStatus] = useState<CheckboxStatus>(
        Object.fromEntries(tasks.map((x) => [x.id, false]))
    )
    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(false)
    const [completionTime, setCompletionTime] = useState<number>()
    const areAllCheckboxesChecked = tasks.every((task) => checkboxStatus[task.id])

    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskId}/addpunch`)
    }

    const api = apiService()
    const handleSubmit = async () => {
        if (areAllCheckboxesChecked)
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    'Committed',
                    workflow.user.id,
                    completionTime
                )
                setSubmitDialogShowing(false)

                if (res.ok && openSnackbar) openSnackbar('Checklist committed')
                navigate('/MyChecklists')
                if (res.ok) setRefreshList((prev) => !prev)
            } catch (error) {
                console.log(error)
            }
        else {
            setIsSubmissionAllowed(true)
            openSnackbar && openSnackbar('all tasks must be checked to committ checklist')
        }
    }

    return (
        <>
            {tasks.map((task) => (
                <>
                    <FillOutWrap key={task.id}>
                        <CustomCard>
                            <Card.Header
                                style={{
                                    filter: applicableStatuses[task.id] ? 'blur(3px)' : 'none',
                                }}
                            >
                                <CustomCategoryName>{task.category.name}</CustomCategoryName>

                                <Typography
                                    onClick={() => {
                                        setTaskId(task.id)
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
                                    <StyledSwitch
                                        size="small"
                                        label="N/A?"
                                        type="checkbox"
                                        value={[task.id] || false}
                                        checked={applicableStatuses[task.id] || false}
                                        onChange={(e) => {
                                            setApplicableStatuses((prev) => ({
                                                ...prev,
                                                [task.id]: e.target.checked,
                                            }))

                                            e.target.checked ? 'Active' : 'Disabled'
                                        }}
                                    />
                                </NotApplicableWrap>
                                <CustomTaskField
                                    style={{
                                        filter: applicableStatuses[task.id] ? 'blur(3px)' : 'none',
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

                            {applicableStatuses[task.id] ? (
                                <ImageContainer />
                            ) : (
                                <SubmitErrorContainer>
                                    <Checkbox
                                        label={''}
                                        name={`task.${task.id}`}
                                        id={`checkbox-${task.id}`}
                                        checked={checkboxStatus[task.id] || false}
                                        onChange={(e) => {
                                            setCheckboxStatus((prev) => ({
                                                ...prev,
                                                [task.id]: e.target.checked,
                                            }))
                                        }}
                                    />{' '}
                                    {!checkboxStatus[task.id] && isSubmissionAllowed ? (
                                        <Error> required</Error>
                                    ) : (
                                        ''
                                    )}
                                </SubmitErrorContainer>
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
                <Typography group="input" variant="text" token={{ textAlign: 'left' }}>
                    You will be forwarded to Punch form. You will be able to continue this form
                    where you left after.
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
            >
                {' '}
                this will committ {workflow.checklist.title} to {workflow.creator.username}
                {/* <CustomTaskField
                    label={'Completion time'}
                    key={''}
                    id="storybook-multi-readonly"
                    name="completionTime"
                    defaultValue={''}
                    type="number"
                    multiline
                    onChange={(e) => {
                        console.log(e.target.valueAsNumber)
                        setCompletionTime(e.target.valueAsNumber)
                    }}
                /> */}
                <label htmlFor="completionTime">Completion time:</label>
                <input
                    id="completionTime"
                    type="number"
                    // value={completionTime}
                    onChange={(e) => {
                        setCompletionTime(e.target.valueAsNumber)
                    }}
                />
            </CustomDialog>
        </>
    )
}
