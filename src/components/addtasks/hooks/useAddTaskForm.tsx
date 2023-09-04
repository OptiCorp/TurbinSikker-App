import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { FormValuesEntity } from '../context/models/FormValuesEntity'

export const useAddTaskForm = () => {
    const { id } = useParams()
    const { idToken } = useAuth()
    const appLocation = useLocation()
    const methods = useForm<FormValuesEntity>()
    const { reset, watch, handleSubmit, register, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useCheckListContext()
    const [selectedOption] = useState('')
    const [selectedTask] = useState('')
    const [checkListId, setCheckListId] = useState<CheckListEntity | null>(null)
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])

    const onSubmit: SubmitHandler<FormValuesEntity> = async (data) => {
        const res = await fetch(
            `https://turbinsikker-api-lin-prod.azurewebsites.net/api/AddTaskToChecklist?checklistId=${id}&taskId=${data.task}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
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
            if (checkListId) return
            const res = await fetch(
                `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetChecklist?id=${id}`
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()
            const sorted = data.tasks.sort((a: any, b: any) => {
                if (a.category.name < b.category.name) {
                    return -1
                } else if (a.category.name > b.category.name) {
                    return 1
                } else {
                    return 0
                }
            })

            setSortedTasks(sorted)
            setCheckListId(data)
        }

        console.log(checkListId)
        fetchAllCheckListsId()
    }, [refreshList])

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
        checkListId,
    }
}
