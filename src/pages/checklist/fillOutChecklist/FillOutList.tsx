import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { FunctionComponent, useState } from 'react'

import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { Card, Checkbox, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_drop_down } from '@equinor/eds-icons'
import { Controller, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { WorkFlow } from '../workflow/types'
import {
    CustomCard,
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    FillOutWrap,
    ImageContainer,
    NotApplicableWrap,
    StyledHeaderCard,
    StyledSwitch,
} from './styles'

type Props = {
    workFlowById: WorkFlow
    task: TaskEntity

    onUpdate: (data: {
        id: string

        userId: string
        status: string
    }) => void
}

export const FillOutList: FunctionComponent<Props> = ({ task }) => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})
    const { workFlowById: workFlow } = useWorkflowContext()
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const { workflowId } = useParams() as { workflowId: string }

    const [punchDialogShowing, setPunchDialogShowing] = useState(false)

    const [checkboxChecked, setCheckboxChecked] = useState(false)

    const navigate = useNavigate()

    const [taskId, setTaskId] = useState('')

    const createPunch = () => {
        navigate(`/workflow/${workflowId}/${taskId}/addpunch`)
    }

    return (
        <>
            <FillOutWrap>
                <div>
                    <CustomCard>
                        <StyledHeaderCard
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
                        </StyledHeaderCard>
                        <CustomCardContent>
                            <NotApplicableWrap>
                                <Controller
                                    control={control}
                                    name="N/A"
                                    rules={{
                                        required: 'Required',
                                    }}
                                    defaultValue={false}
                                    render={({ field: { onChange } }) => (
                                        <StyledSwitch
                                            size="small"
                                            label="N/A?"
                                            type="checkbox"
                                            value={[task.id] || false}
                                            checked={
                                                applicableStatuses[task.id] ||
                                                false
                                            }
                                            onChange={(e) => {
                                                setApplicableStatuses(
                                                    (prev) => ({
                                                        ...prev,
                                                        [task.id]:
                                                            e.target.checked,
                                                    })
                                                )
                                                onChange(
                                                    e.target.checked
                                                        ? 'Active'
                                                        : 'Disabled'
                                                )
                                            }}
                                        />
                                    )}
                                />
                            </NotApplicableWrap>
                            <CustomTaskField
                                style={{
                                    filter: applicableStatuses[task.id]
                                        ? 'blur(3px)'
                                        : 'none',
                                }}
                                label=""
                                key={task?.id}
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
                                            // onClick={toggleReadMore}
                                        />
                                    ) : null
                                }
                            />{' '}
                        </CustomCardContent>
                        <Card.Actions alignRight>
                            {applicableStatuses[task.id] ? (
                                <ImageContainer />
                            ) : (
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Required',
                                    }}
                                    name={`task.${task.id}`}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="checkbox"
                                            aria-invalid={
                                                errors.agree ? 'true' : 'false'
                                            }
                                            aria-required
                                            checked={checkboxChecked}
                                            onChange={(e) => {
                                                setCheckboxChecked(
                                                    e.target.checked
                                                )
                                                field.onChange(
                                                    e.target.checked
                                                        ? 'Active'
                                                        : 'Disabled'
                                                )
                                            }}
                                        />
                                    )}
                                />
                            )}
                        </Card.Actions>
                    </CustomCard>
                </div>
            </FillOutWrap>
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
                title="Submit form?"
                type="submit"
                form="fill-out-checklist"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="Submit"
                positiveButtonOnClick={() => {
                    setSubmitDialogShowing(false)
                }}
                isOpen={submitDialogShowing}
            ></CustomDialog>

            <NavActionsComponent
                buttonColor="primary"
                as="button"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setSubmitDialogShowing(true)}
                isShown={true}
                ButtonMessage="Clear"
                type="button"
                SecondButtonMessage="sdfsdf"
            />
        </>
    )
}
