import { ChangeEvent, FunctionComponent, useState } from 'react'

import { Card, Checkbox, Chip, Typography } from '@equinor/eds-core-react'

import {
    Controller,
    DeepMap,
    FieldError,
    FieldValues,
    useFieldArray,
    useFormContext,
} from 'react-hook-form'
import { WorkflowResponse } from '../../services/apiTypes'

import { DialogInspector } from './dialogInspector'
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
    const [punchDialogShowing, setPunchDialogShowing] = useState(false)
    const [taskId, settaskId] = useState('')

    const methods = useFormContext<FillOutChecklistForm>()

    const { fields } = useFieldArray({
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
                                        label=""
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

                                <SubmitErrorContainer>
                                    <Controller
                                        control={methods.control}
                                        name={`taskInfos.${index}.status`}
                                        rules={{
                                            validate: (value) => {
                                                return value === 'Finished' ||
                                                    value === 'NotApplicable'
                                                    ? true
                                                    : 'Task must be marked as finished or N/A'
                                            },
                                        }}
                                        render={({
                                            field: { value, onChange },
                                            fieldState: { error },
                                        }) => {
                                            return (
                                                <>
                                                    {' '}
                                                    {value ===
                                                    'NotApplicable' ? (
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
                                                                value ===
                                                                'Finished'
                                                            }
                                                            onChange={(
                                                                e: ChangeEvent<HTMLInputElement>
                                                            ) => {
                                                                onChange(
                                                                    e.target
                                                                        .checked
                                                                        ? 'Finished'
                                                                        : 'Unfinished'
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                    {error && (
                                                        <Typography
                                                            color="danger"
                                                            group="table"
                                                            variant="cell_header"
                                                            token={{
                                                                fontSize:
                                                                    '1rem',
                                                            }}
                                                        >
                                                            {error.message}
                                                        </Typography>
                                                    )}
                                                </>
                                            )
                                        }}
                                    />
                                </SubmitErrorContainer>
                            </CustomCard>
                        )
                    })}
                </FillOutWrap>
                <>
                    <DialogInspector
                        workflow={workflow}
                        taskId={taskId}
                        setPunchDialogShowing={setPunchDialogShowing}
                        punchDialogShowing={punchDialogShowing}
                        setSubmitDialogShowing={setSubmitDialogShowing}
                        submitDialogShowing={submitDialogShowing}
                    />
                </>
            </>
        </>
    )
}
