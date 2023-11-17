import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useEffect, useState } from 'react'
import { default as useGlobal } from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { WorkflowResponse } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { FillOutChecklistForm } from './types'

const objectTaskListToArray = (taskObject: { [key: string]: string }) => {
    return Object.entries(taskObject).reduce(
        (acc, [key, value]) => {
            acc.push({
                taskId: key,
                status: value,
            })
            return acc
        },
        [] as {
            taskId: string
            status: string
        }[]
    )
}

export const useFillChecklistForm = () => {
    const [submitDialogShowing, setSubmitDialogShowing] = useState(false)
    const navigate = useNavigate()

    const api = apiService()
    const { currentUser, openSnackbar, setRefreshList } = useGlobal()
    const [workflow, setWorkflow] = useState<WorkflowResponse>()

    const { isInspector, isLeader } = useRoles()

    const methods = useForm<FillOutChecklistForm>()
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors },
    } = methods

    const { workflowId } = useParams() as { workflowId: string }

    useEffect(() => {
        ;(async (): Promise<void> => {
            const workFlowData = await api.getWorkflow(workflowId)

            if (!currentUser || !workFlowData) return
            methods.reset({
                id: workflowId,
                userId: isInspector ? currentUser.id : workFlowData.user.id,
                status: workFlowData.status,
                completionTimeMinutes: workFlowData.completionTimeMinutes,
                taskInfos: objectTaskListToArray(workFlowData.taskInfos),
                comment: workFlowData.comment,
            })
            setWorkflow(workFlowData)
        })()
    }, [workflowId])

    const onSubmit: SubmitHandler<FillOutChecklistForm> = async (
        data: FillOutChecklistForm
    ) => {
        if (
            (isLeader && data.status ==='Done' )
        ) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
          data.status,
                    data.completionTimeMinutes,
                    methods.watch('taskInfos'),
                    ''
                )

                if (res.ok) {
                    setSubmitDialogShowing(false)
                    if (openSnackbar) openSnackbar('Checklist marked as done')
                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                } else {
                    setSubmitDialogShowing(false)
                }
            } catch (error) {
                console.error(error)
                setSubmitDialogShowing(false)
            }
        } else if (isLeader && data.comment && data.status === 'Rejected') {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                   data.status,
                    data.completionTimeMinutes,
                    methods.watch('taskInfos'),
                    data.comment
                )

                if (res.ok) {
                    setSubmitDialogShowing(false)
                    if (openSnackbar)
                        openSnackbar('Checklist marked as rejected')
                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                } else {
                    setSubmitDialogShowing(false)
                }
            } catch (error) {
                console.error(error)
                setSubmitDialogShowing(false)
            }
        } else if (isInspector) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Committed',
                    data.completionTimeMinutes,
                    methods.watch('taskInfos'),
                    methods.watch('comment')
                )

                if (res.ok) {
                    setSubmitDialogShowing(false)
                    if (openSnackbar) openSnackbar('Checklist committed')
                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                }
            } catch (error) {
                console.error(error)
                setSubmitDialogShowing(false)
            }
        }
    }

    return {
        methods,
        onSubmit,
        workflow,
        control,
        setSubmitDialogShowing,
        submitDialogShowing,
        formState: { errors },
        register,
        reset,
        handleSubmit,
    }
}
