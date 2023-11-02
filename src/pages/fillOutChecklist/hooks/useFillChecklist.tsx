import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useEffect, useState } from 'react'
import { default as useGlobal } from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import {
    ChecklistTaskInfo,
    TaskInfos,
    WorkflowResponse,
} from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { FillOutChecklistForm } from './types'

export const useFillChecklistForm = () => {
    const methods = useForm<FillOutChecklistForm>()

    const navigate = useNavigate()

    const api = apiService()
    const { currentUser, openSnackbar, setRefreshList } = useGlobal()

    const { isInspector, isLeader } = useRoles()
    const { handleSubmit, control } = methods
    const { id, workflowId, taskId } = useParams() as {
        id: string
        workflowId: string
        taskId: string
    }

    const [checklistTasks, setChecklistTasks] = useState<ChecklistTaskInfo[]>(
        []
    )
    const [taskInfos, setTaskInfos] = useState<TaskInfos>()
    const [workflow, setWorkFlow] = useState<WorkflowResponse>()

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!currentUser) return
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
                if (workFlowData?.checklist.checklistTasks) {
                    setChecklistTasks(workFlowData.checklist.checklistTasks)
                }
                if (workflow?.taskInfos) {
                    setTaskInfos(workFlowData.taskInfos)
                }
                console.log(workFlowData.taskInfos)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const onSubmit: SubmitHandler<FillOutChecklistForm> = async (
        data: FillOutChecklistForm
    ) => {
        const taskInfos = Object.entries(data.taskInfos).reduce(
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

        if (isLeader && workflowId) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Done' || 'Rejected',
                    data.completionTimeMinutes,
                    taskInfos
                )

                if (res.ok) {
                    if ('Done' && openSnackbar) {
                        openSnackbar('Checklist Approved')
                    } else if ('Rejected' && openSnackbar) {
                        openSnackbar('Checklist Rejected')
                    }

                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isInspector && workflowId) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Committed',
                    data.completionTimeMinutes,
                    taskInfos
                )
                if (res.ok) {
                    openSnackbar && openSnackbar('Checklist committed')
                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                } else if ('') {
                    openSnackbar &&
                        openSnackbar(
                            'All tasks must be checked to commit checklist'
                        )
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        methods,
        onSubmit,
        control,
        taskInfos,
        checklistTasks,
        workflow,
        handleSubmit,
    }
}
