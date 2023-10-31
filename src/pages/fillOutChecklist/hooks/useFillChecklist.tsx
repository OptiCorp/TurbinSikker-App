import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { default as useGlobal } from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { useRoles } from '../../../services/useRoles'

export type FillOutChecklistEntity = {
    id: string
    userId: string
    status: string
    completionTimeMinutes: number
    taskInfos: { id: string; taskId: string; status: number }[]
}

export const useFillChecklistForm = () => {
    const methods = useForm<FillOutChecklistEntity>()

    const navigate = useNavigate()

    const api = apiService()
    const { currentUser, accessToken, openSnackbar, setRefreshList } =
        useGlobal()
    const creatorId = currentUser?.id
    const { isInspector, isLeader } = useRoles()
    const { handleSubmit, control } = methods
    const { id, workflowId, taskId } = useParams() as {
        id: string
        workflowId: string
        taskId: string
    }

    const onSubmit: SubmitHandler<FillOutChecklistEntity> = async (
        data: FillOutChecklistEntity
    ) => {
        if (isLeader && workflowId) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Done' || 'Rejected',
                    data.completionTimeMinutes,
                    data.taskInfos
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

        if (
            isInspector &&
            workflowId &&
            data.taskInfos.every((task) => task.status === 1 || 2)
        ) {
            try {
                const res = await api.updateWorkflow(
                    workflowId,
                    data.userId,
                    'Committed',
                    data.completionTimeMinutes,
                    data.taskInfos
                )
                if (res.ok) {
                    openSnackbar && openSnackbar('Checklist committed')
                    navigate('/Checklists')
                    setRefreshList((prev) => !prev)
                } else if (data.taskInfos.some((task) => task.status === 0)) {
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
        handleSubmit,
    }
}
