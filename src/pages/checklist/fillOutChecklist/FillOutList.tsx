import { FunctionComponent, useState } from 'react'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'

import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
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
    sortedTasks: CheckListEntity['tasks']
    WorkFlow: WorkFlow
    onUpdate: (data: {
        id: string
        checklistId: string
        userId: string
        status: number
    }) => void
}

export const FillOutList: FunctionComponent<Props> = ({
    WorkFlow,
    sortedTasks,

    onUpdate,
}) => {
    let lastCategoryName = ''

    const [isShowMore, setIsShowMore] = useState(true)
    const toggleReadMore = () => setIsShowMore((show) => !show)
    const { control, register } = useFormContext()
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)

    const methods = useFormContext()

    const handleSubmit = async () => {
        try {
            onUpdate({
                id: WorkFlow.id,
                checklistId: WorkFlow.checklistId,
                userId: WorkFlow.userId,
                status: 2,
            })
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    return (
        <>
            <FillOutWrap>
                {sortedTasks.map((task) => {
                    const categoryName =
                        task.category.name !== lastCategoryName
                            ? task.category.name
                            : ''

                    lastCategoryName = task.category.name
                    console.log(categoryName)
                    return (
                        <div key={task?.id}>
                            <CustomCard>
                                <StyledHeaderCard
                                    style={{
                                        filter: applicableStatuses[task.id]
                                            ? 'blur(3px)'
                                            : 'none',
                                    }}
                                >
                                    <CustomCategoryName>
                                        {categoryName}
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
                                            render={({
                                                field: { onChange },
                                            }) => (
                                                <StyledSwitch
                                                    size="small"
                                                    label="N/A?"
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection:
                                                            'column-reverse',
                                                        margin: '0 auto',
                                                        alignItems: 'baseline',
                                                    }}
                                                    type="checkbox"
                                                    value={[task.id] || false}
                                                    {...register(
                                                        String(task?.id)
                                                    )}
                                                    checked={
                                                        applicableStatuses[
                                                            task.id
                                                        ] || false
                                                    }
                                                    onChange={(e) => {
                                                        setApplicableStatuses(
                                                            (prev) => ({
                                                                ...prev,
                                                                [task.id]:
                                                                    e.target
                                                                        .checked,
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
                                                    onClick={toggleReadMore}
                                                />
                                            ) : null
                                        }
                                    />
                                </CustomCardContent>
                                <Card.Actions alignRight>
                                    {applicableStatuses[task.id] ? (
                                        <ImageContainer />
                                    ) : (
                                        <Checkbox
                                            aria-label=""
                                            type="checkbox"
                                        />
                                    )}
                                </Card.Actions>
                            </CustomCard>
                        </div>
                    )
                })}
            </FillOutWrap>
            <CustomDialog
                title="Submit form?"
                type="submit"
                form="fill-out-checklist"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                positiveButtonOnClick={() => {
                    handleSubmit()
                }}
                isOpen={submitDialogShowing}
            ></CustomDialog>

            <NavActionsComponent
                buttonColor="primary"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setSubmitDialogShowing(true)}
                isShown={true}
                ButtonMessage="Clear"
                SecondButtonMessage="Submit"
            />
        </>
    )
}
