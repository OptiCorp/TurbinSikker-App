import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Category, Task } from '../../../services/apiTypes'
import { AddTaskForm } from '../types'

export const useAddTaskForm = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const { id: checklistId } = useParams() as { id: string }
    const appLocation = useLocation()
    const { currentUser } = useGlobal()
    const methods = useForm<AddTaskForm>({
        defaultValues: { id: '', category: '' },
    })
    const { handleSubmit, control, reset, resetField, watch } = methods
    const [selectedOption, setSelectedOption] = useState('')
    const { openSnackbar, refreshList, setRefreshList } = useGlobal()
    const api = apiService()
    const [category, setCategory] = useState<Category[]>([])
    const [checklistsData, setChecklistsData] = useState<Task[]>([])

    useEffect(() => {
        if (!tasks && !checklistId) return
        ;(async () => {
            try {
                const checklistTaskData =
                    await api.getAllTasksByChecklistId(checklistId)

                setChecklistsData(checklistTaskData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id, checklistId])

    const onSubmit: SubmitHandler<AddTaskForm> = async (data: AddTaskForm) => {
        const taskAlreadyExist = checklistsData.some(
            (Task) => Task.id === data.id
        )

        if (taskAlreadyExist) {
            if (openSnackbar)
                openSnackbar('task already excist on this checklist')
         
            return
        }

        try {
            const res = await api.addTaskToChecklist(data.id, checklistId)
            if (res.ok) {
                if (openSnackbar) openSnackbar('Task added')
                if (res.ok) setRefreshList((prev) => !prev)

                if (res.ok) methods.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!currentUser?.id) return
            try {
                const categoryData = await api.getAllCategories()
                const categories: Category[] = categoryData.map(
                    ({ id, name }) => ({
                        id,
                        name,
                        value: id,
                        label: name,
                    })
                )
                setCategory(categories)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id, refreshList, selectedOption])

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!selectedOption || !currentUser?.id) return
            try {
                const taskData =
                    await api.getAllTasksByCategoryId(selectedOption)
                if (taskData) {
                    setTasks(taskData)
                } else {
                    setTasks([])
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [selectedOption, currentUser?.id, refreshList])

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        location: appLocation.pathname,
        setSelectedOption,
        reset,
        resetField,
        category,
        watch,
        selectedOption,
        tasks,
    }
}
