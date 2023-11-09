// import { FunctionComponent, useState } from 'react'

import { FunctionComponent } from 'react'
import { ReviewProps } from './types'

import { Checkbox, Icon } from '@equinor/eds-core-react'
import { error_filled } from '@equinor/eds-icons'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { DialogLeader } from './dialogLeader'
import { FillOutChecklistForm } from './hooks/types'
import {
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    Error,
    ImageContainer,
    NotApplicableWrap,
    ReviewCardHeader,
    ReviewWrap,
    StyledReviewCard,
    StyledSwitch,
} from './styles'

export const ReviewList: FunctionComponent<ReviewProps> = ({ workflow }) => {
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
                            // style={{
                            //     border:
                            //         field.status === 'Unfinished'
                            //             ? '2px solid red'
                            //             : field.status === 'Finished'
                            //             ? '2px solid green'
                            //             : field.status === 'NotApplicable'
                            //             ? '2px solid yellow'
                            //             : '',
                            // }}
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
                                {/* <Chip variant="active">
                                    <Typography
                                        variant="caption"
                                        token={{
                                            textAlign: 'center',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                        }}
                                    ></Typography>
                                </Chip> */}
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
                                    style={{
                                        filter:
                                            field.status === 'NotApplicable'
                                                ? 'blur(3px)'
                                                : 'none',
                                    }}
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
                                    {field.status === 'NotApplicable' ? (
                                        <ImageContainer />
                                    ) : (
                                        <Checkbox
                                            readOnly
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
                                    )}
                                </Error>
                            </CustomCardContent>
                        </StyledReviewCard>
                    )
                })}
            </ReviewWrap>{' '}
            <>
                <DialogLeader workflow={workflow} />
            </>
        </>
    )
}
