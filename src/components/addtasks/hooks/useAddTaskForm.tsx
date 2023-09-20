import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useWorkflowContext } from '../../../pages/checklist/workflow/context/workFlowContextProvider'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { CheckListEntity } from '../../../pages/context/models/CheckListEntity'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { FormValuesEntity } from '../context/models/FormValuesEntity'
export const useAddTaskForm = () => {
    const { id } = useParams() as { id: string }

    const appLocation = useLocation()
    const methods = useForm<FormValuesEntity>()
    const { reset, watch, handleSubmit, register, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useCheckListContext()
    const [selectedOption] = useState('')
    const [selectedTask] = useState('')
    const [checkListById, setCheckListById] = useState<CheckListEntity | null>(
        null
    )
    const { accessToken } = useAuth()
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])
    const { allWorkFlows, workFlowById, WorkFlows } = useWorkflowContext()
    const onSubmit: SubmitHandler<FormValuesEntity> = async (data) => {
        const res = await fetch(
            `${API_URL}/AddTaskToChecklist?checklistId=${id}&taskId=${data.task}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data.task),
            }
        )
        if (res.ok) setRefreshList((prev) => !prev)

        if (openSnackbar) {
            openSnackbar('Task added!')
        }
    }
    useEffect(() => {
        const fetchAllCheckListsId = async () => {
            if (!id || !accessToken || workFlowById) return
            try {
                const res = await fetch(`${API_URL}/GetChecklist?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                })

                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)

                const data = (await res.json()) as CheckListEntity
                setCheckListById(data)
                const sorted = data.checklistTasks.sort((a: any, b: any) => {
                    if (a.category.name < b.category.name) {
                        return -1
                    } else if (a.category.name > b.category.name) {
                        return 1
                    } else {
                        return 0
                    }
                })

                setSortedTasks(sorted)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchAllCheckListsId()
    }, [refreshList, accessToken, id])

    return {
        methods,
        onSubmit,
        control,
        register,
        handleSubmit,
        watch,
        location: appLocation.pathname,
        selectedOption,
        reset,
        selectedTask,
        sortedTasks,
        checkListById,
    }
}
