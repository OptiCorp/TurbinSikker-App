// import { FunctionComponent, useState } from 'react'

import { FunctionComponent } from 'react'
import { ReviewProps } from './types'

import { Checkbox, Icon, Label } from '@equinor/eds-core-react'
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
                         
                            elevation="raised"
                        >
                             <Label
                            htmlFor="storybook-multi-readonly"
                            label={task.category.name}
                            style={{
                                height: '0',
                                fontWeight: '600',
                                fontSize: '1rem',
                            }}
                        />{' '}
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
