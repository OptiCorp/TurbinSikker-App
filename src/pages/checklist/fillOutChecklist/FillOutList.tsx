import { FunctionComponent, useState } from 'react'

import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'

import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { Card, Checkbox, Icon } from '@equinor/eds-core-react'
import { arrow_drop_down } from '@equinor/eds-icons'
import { Controller, useFormContext } from 'react-hook-form'
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

export const FillOutList: FunctionComponent<Props> = ({
    workFlowById,
    task,

    onUpdate,
}) => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})
    const {
        control,

        formState: { errors },
    } = useFormContext()

    const handleSubmit = async () => {
        try {
            onUpdate({
                id: workFlowById.id,

                userId: workFlowById.userId,
                status: 'Committed',
            })
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    return (
        <>
            <FillOutWrap>
                <div key={workFlowById?.id}>
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
                            />
                        </CustomCardContent>
                        <Card.Actions alignRight>
                            {applicableStatuses[task.id] ? (
                                <ImageContainer />
                            ) : (
                                <Controller
                                    control={control}
                                    defaultValue={false}
                                    rules={{ required: true }}
                                    name={`task.${task.id}`}
                                    render={({ field }) => (
                                        <Checkbox
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
                                            id="checkbox"
                                            aria-invalid={
                                                errors.agree ? 'true' : 'false'
                                            }
                                        />
                                    )}
                                />
                            )}
                        </Card.Actions>
                    </CustomCard>
                </div>
            </FillOutWrap>
            <CustomDialog
                title="Submit form?"
                type="submit"
                form="fill-out-checklist"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="Submit"
                positiveButtonOnClick={() => {
                    handleSubmit()
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
