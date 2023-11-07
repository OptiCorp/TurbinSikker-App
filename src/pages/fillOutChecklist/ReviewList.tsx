// import { FunctionComponent, useState } from 'react'

import { FunctionComponent, useState } from 'react'
import { ReviewProps } from './types'

import { Checkbox, Chip, Icon, Typography } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { FillOutChecklistForm } from './hooks/types'
import {
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    Error,
    NotApplicableWrap,
    ReviewCardHeader,
    ReviewWrap,
    StyledReviewCard,
    StyledSwitch,
} from './styles'

export const ReviewList: FunctionComponent<ReviewProps> = ({ workflow }) => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)

    const [rejectDialogShowing, setRejectDialogShowing] = useState(false)

    const methods = useFormContext<FillOutChecklistForm>()

    const { fields } = useFieldArray({
        control: methods.control,
        name: 'taskInfos',
    })

    return (
        <>
            <ReviewWrap>
                {fields.map((field) => {
                    const task = workflow.checklist.checklistTasks.find(
                        (x) => x.id === field.taskId
                    )
                    if (!task) return
                    return (
                        <StyledReviewCard
                            style={{
                                border:
                                    field.status === 'Unfinished'
                                        ? '2px solid red'
                                        : '2px solid green',
                            }}
                            // variant={
                            //     field.status === 'Unfinished'
                            //         ? 'danger'
                            //         : 'default'
                            // }
                            elevation="raised"
                        >
                            <ReviewCardHeader>
                                <CustomCategoryName>
                                    {task.category.name}{' '}
                                </CustomCategoryName>
                                <Chip variant="active">
                                    <Typography
                                        variant="caption"
                                        token={{
                                            textAlign: 'center',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                        }}
                                    >
                                        {field.status === 'Unfinished'
                                            ? 'error'
                                            : 'success'}
                                    </Typography>
                                </Chip>
                            </ReviewCardHeader>
                            <CustomCardContent>
                                <NotApplicableWrap>
                                    <StyledSwitch
                                        disabled={true}
                                        size="small"
                                        label="N/A?"
                                        type="checkbox"
                                        checked={
                                            field.status === 'NotApplicable'
                                                ? true
                                                : false
                                        }
                                    />
                                </NotApplicableWrap>
                                <CustomTaskField
                                    helperIcon={
                                        field.status === 'Unfinished' && (
                                            <Icon
                                                data={error_filled}
                                                title="Info"
                                                size={16}
                                            />
                                        )
                                    }
                                    helperText={
                                        field.status === 'Unfinished'
                                            ? 'is not finished'
                                            : ''
                                    }
                                    label={''}
                                    key={task.id}
                                    id="storybook-multi-readonly"
                                    name="task"
                                    defaultValue={task.description}
                                    multiline
                                    rows={2}
                                    readOnly
                                />

                                <Error>
                                    <Checkbox
                                        disabled={
                                            field.status === 'NotApplicable'
                                                ? true
                                                : false
                                        }
                                        checked={
                                            field.status === 'Finished'
                                                ? true
                                                : false
                                        }
                                    />
                                </Error>
                            </CustomCardContent>
                        </StyledReviewCard>
                    )
                })}
            </ReviewWrap>{' '}
        </>
    )

    {
        /* <NavActionsComponent
                        buttonColor="primary"
                        as="button"
                        secondButtonColor="primary"
                        buttonVariant="outlined"
                        secondOnClick={() => setSubmitDialogShowing(true)}
                        isShown={true}
                        onClick={() => setRejectDialogShowing(true)}
                        ButtonMessage="Reject"
                        type="button"
                        SecondButtonMessage="Approve"
                    />
                </>
         
            <CustomDialog
                title="Reject Checklist?"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setRejectDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                positiveButtonOnClick={() => {
                    // handleReject()
                }}
                isOpen={rejectDialogShowing}
            >
                <RejectWrap>
                    <Typography
                        group="input"
                        variant="text"
                        token={{ textAlign: 'left' }}
                    >
                        {workflow.checklist.title} will be send back to{' '}
                    </Typography>

                    <UserChip workflow={workflow} />

                    <CustomTaskField
                        label={''}
                        key={workflow.id}
                        id="storybook-multi-readonly"
                        name="workflow"
                        multiline
                        placeholder="Describe why the checklist was rejected"
                        rows={3}
                    />
                </RejectWrap>
            </CustomDialog>
            <CustomDialog
                title={`Approve ${workflow.checklist.title}?`}
                buttonVariant="ghost"
                negativeButtonOnClick={() => setSubmitDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="Submit"
                positiveButtonOnClick={() => {
                    setSubmitDialogShowing(false)
                    // handleSubmit()
                }}
                isOpen={submitDialogShowing}
            ></CustomDialog> */
    }
}
