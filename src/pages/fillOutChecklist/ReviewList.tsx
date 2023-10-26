import { FunctionComponent, useState } from 'react'

import { Checkbox, Chip, Typography } from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../components/modal/useModalHook'
import { NavActionsComponent } from '../../components/navigation/hooks/useNavActionBtn'

import apiService from '../../services/api'

import useGlobal from '../../context/globalContextProvider'
import { UserChip } from '../checklist/inprogressChecklists/UserChip'
import {
    CustomCardContent,
    CustomCategoryName,
    CustomTaskField,
    Error,
    NotApplicableWrap,
    RejectWrap,
    ReviewCardHeader,
    ReviewWrap,
    StyledReviewCard,
    StyledSwitch,
} from './styles'
import { FillOutListProps } from './types'

export const ReviewList: FunctionComponent<FillOutListProps> = ({
    tasks,
    workflow,
}) => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const [applicableStatuses, setApplicableStatuses] = useState<
        Record<string, boolean>
    >({})

    const { workflowId } = useParams() as { workflowId: string }
    const { currentUser, openSnackbar, setRefreshList } = useGlobal()
    const [rejectDialogShowing, setRejectDialogShowing] = useState(false)
    const navigate = useNavigate()

    const api = apiService()
    const handleSubmit = async () => {
        if (!currentUser) return
        try {
            const res = await api.updateWorkflow(
                workflowId,
                'Done',
                workflow.user.id
            )
            setSubmitDialogShowing(false)
            if (res.ok) {
                if (openSnackbar) openSnackbar('Checklist approved')
                navigate('/Checklists')
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReject = async () => {
        if (!currentUser) return
        try {
            const res = await api.updateWorkflow(
                workflowId,
                'Sent',
                workflow.user.id
            )
            setRejectDialogShowing(false)
            if (res.ok) {
                if (openSnackbar) openSnackbar('Checklist rejected')
                navigate('/Checklists')
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [checked, updateChecked] = useState(true)
    return (
        <>
            {tasks.map((task) => (
                <>
                    <ReviewWrap key={task.id}>
                        <StyledReviewCard>
                            <ReviewCardHeader
                                style={{
                                    filter: applicableStatuses[task.id]
                                        ? 'blur(3px)'
                                        : 'none',
                                }}
                            >
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
                                        marked as completed
                                    </Typography>
                                </Chip>
                            </ReviewCardHeader>
                            <CustomCardContent>
                                <NotApplicableWrap>
                                    <StyledSwitch
                                        disabled
                                        size="small"
                                        label="N/A?"
                                        type="checkbox"
                                        value={[task.id] || false}
                                    />
                                </NotApplicableWrap>
                                <CustomTaskField
                                    label={''}
                                    key={task.id}
                                    id="storybook-multi-readonly"
                                    name="task"
                                    defaultValue={task.description}
                                    multiline
                                    rows={4}
                                    readOnly
                                />
                                {/* {applicableStatuses[task.id] ? (
                                <ImageContainer />
                            ) : ( */}{' '}
                                <Error>
                                    <Checkbox
                                        label=""
                                        checked={checked}
                                        disabled
                                    />{' '}
                                </Error>
                            </CustomCardContent>
                        </StyledReviewCard>
                    </ReviewWrap>

                    <NavActionsComponent
                        buttonColor="primary"
                        as="button"
                        secondButtonColor="primary"
                        buttonVariant="outlined"
                        secondOnClick={() => setSubmitDialogShowing(true)}
                        isShown={true}
                        onClick={() => setRejectDialogShowing(true)}
                        ButtonMessage="Redject"
                        type="button"
                        SecondButtonMessage="Approve"
                    />
                </>
            ))}
            <CustomDialog
                title="Reject Checklist?"
                buttonVariant="ghost"
                negativeButtonOnClick={() => setRejectDialogShowing(false)}
                negativeButtonText="Cancel"
                positiveButtonText="OK"
                positiveButtonOnClick={() => {
                    handleReject()
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
                    handleSubmit()
                }}
                isOpen={submitDialogShowing}
            ></CustomDialog>
        </>
    )
}
