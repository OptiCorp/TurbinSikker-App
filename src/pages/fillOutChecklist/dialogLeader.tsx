import { FunctionComponent, useState } from 'react'

import {
    Button,
    Dialog,
    Input,
    Label,
    Typography,
} from '@equinor/eds-core-react'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/NavActionBtn'

import {
    Controller,
    DeepMap,
    FieldError,
    FieldValues,
    useFormContext,
} from 'react-hook-form'
import { WorkflowResponse } from '../../services/apiTypes'

import { UserChip } from '../checklist/inprogressChecklists/UserChip'
import { FillOutChecklistForm } from './hooks/types'
import { CustomTaskField, RejectWrap } from './styles'

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
    DeepMap<TFieldValues, FieldError>

export type DialogProps = {
    workflow: WorkflowResponse
}

export const DialogLeader: FunctionComponent<DialogProps> = ({ workflow }) => {
    const methods = useFormContext<FillOutChecklistForm>()
    const {
        formState: { errors },
    } = methods
    const [rejectDialogShowing, setRejectDialogShowing] = useState(false)
    const [approveDialogShow, setApproveDialogShow] = useState(false)

    return (
        <>
            <NavActionsComponent
                buttonColor="primary"
                as="button"
                secondButtonColor="primary"
                buttonVariant="outlined"
                secondOnClick={() => setApproveDialogShow(true)}
                isShown={true}
                ButtonMessage="Reject"
                type="button"
                primaryType="button"
                onClick={() => {
                    setRejectDialogShowing(true)
                }}
                SecondButtonMessage="approve"
            />

            <CustomDialog
                title="Reject Checklist?"
                buttonVariant="ghost"
                type="submit"
                PrimaryType="button"
                negativeButtonOnClick={() => setRejectDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                form="fill-checklist"
                isOpen={rejectDialogShowing}
            >
                <RejectWrap>
                    <Typography
                        group="input"
                        variant="text"
                        token={{ textAlign: 'left' }}
                    >
                        {workflow.checklist.title} will be send back to
                    </Typography>

                    <UserChip workflow={workflow} />
                    <Controller
                        control={methods.control}
                        name={`comment`}
                        rules={{
                            required: 'Required',
                        }}
                        render={({ field: { ref } }) => (
                            <CustomTaskField
                                label={''}
                                inputRef={ref}
                                key="comment"
                                id="comment"
                                {...methods.register('comment', {
                                    required: 'minimum 5 characters!',
                                    minLength: {
                                        value: 5,
                                        message: 'min length is 5',
                                    },
                                })}
                                defaultValue="write here"
                                multiline
                                placeholder="Describe why the checklist was rejected"
                                rows={3}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    methods.setValue(
                                        'comment',
                                        event.target.value
                                    )
                                }}
                            />
                        )}
                    />
                    {errors.comment && (
                        <span role="alert">
                            <Typography color="red">
                                {' '}
                                {errors.comment.message}
                            </Typography>
                        </span>
                    )}
                </RejectWrap>
            </CustomDialog>

            <Dialog
                open={approveDialogShow}
                onClose={() => setApproveDialogShow(false)}
                isDismissable
            >
                <Dialog.Header>
                    <Dialog.Title>
                        Approve
                        {workflow.checklist.title}?
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography style={{ marginBottom: '10px' }}>
                        Approve {workflow.checklist.title} checklist?
                    </Typography>
                    <div>
                        <Label
                            htmlFor="completionTimeMinutes"
                            label="Completion time (minutes):"
                        />
                        <Input
                            id="completionTimeMinutes"
                            type="number"
                            autoComplete="off"
                            {...methods.register('completionTimeMinutes', {
                                valueAsNumber: true,
                                required: 'This is required.',
                            })}
                            readOnly
                        />
                    </div>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="submit"
                        form="fill-checklist"
                        id="fill-checklist"
                    >
                        Approve
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setApproveDialogShow(false)}
                    >
                        Cancel
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}
