import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
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
    const methods = useForm<FillOutChecklistForm>()

    const navigate = useNavigate()

    const api = apiService()
    const { currentUser, openSnackbar, setRefreshList } = useGlobal()
    const [workflow, setWorkflow] = useState<WorkflowResponse>()
    const { isInspector, isLeader } = useRoles()
    const { handleSubmit, control, register, getFieldState} = methods

    const { fields, update } = useFieldArray({
        control: methods.control,
        name: 'taskInfos',
    })

    
    const { workflowId } = useParams() as { workflowId: string }
    useEffect(() => {
        ;(async (): Promise<void> => {
            const workFlowData = await api.getWorkflow(workflowId)

            if (!currentUser || !workFlowData) return
            methods.reset({
                id: workflowId,
                userId: currentUser.id,
                status: workFlowData.status,
                completionTimeMinutes: workFlowData.completionTimeMinutes,
                taskInfos: objectTaskListToArray(workFlowData.taskInfos),
            })
            setWorkflow(workFlowData)
        })()
    }, [workflowId])

    const onSubmit: SubmitHandler<FillOutChecklistForm> = async (
        data: FillOutChecklistForm
    ) => {
        if (isLeader && workflowId) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Done',
                    data.completionTimeMinutes,
                    methods.watch('taskInfos')
                )

                if (res.ok) {
                    if (openSnackbar) {
                        openSnackbar('Checklist Approved')
                    }

                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isInspector && workflowId) {
            {
                try {
                    const res = await api.updateWorkflow(
                        workflowId,
                        data.userId,
                        'Committed',
                        data.completionTimeMinutes,
                        methods.watch('taskInfos')
                    )
                    if (res.ok) {
                        openSnackbar && openSnackbar('Checklist committed')
                        navigate('/Checklists')
                        setRefreshList((prev) => !prev)
                    }if ('') {
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
    }

    return {
        methods,
        onSubmit,
        workflow,
        control,
        register,
        handleSubmit,
    }
}
