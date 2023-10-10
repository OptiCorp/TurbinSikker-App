import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'

import apiService from '../../../services/api'
import { Checklist, Task, TaskPicker } from '../../../services/apiTypes'

type ChecklistAndTasks = Checklist & TaskPicker

export type CategoryTaskSelector = {
    value: string
    label: string
}

type FormData = {
    task: string
    id: string
    checklistId: string
}

export const useAddTaskForm = () => {
    const [tasks, setTasks] = useState<Task >()
    const { checklistId, taskId } = useParams()
    const appLocation = useLocation()
    const { currentUser } = useGlobal()
    const methods = useForm<FormData>()
    const { reset, watch, handleSubmit, register, control } = methods

    // const { refreshList, setRefreshList } = apiService()
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')

    const { accessToken } = useGlobal()

    const api = apiService()
    const [category, setCategory] = useState<CategoryTaskSelector[]>([])

    const handleCategorySelect = (selectedCategory: string) => {
        setSelectedOption(selectedCategory)
    }

    const handleTaskSelect = (selectedTask: any) => {
        setSelectedTask(selectedTask.value)
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!currentUser || !checklistId || !taskId) return
        try {
            api.addTaskToChecklist(checklistId, data.task)

            // setRefreshList((prev) => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!accessToken || !category) return
            try {
                const categoryData = await api.getAllCategories()
                const category = categoryData.map(
                    ({ id, name }: { id: string; name: string }) => ({
                        value: id,
                        label: name,
                    })
                )
                setCategory(category)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [accessToken])

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!category || !accessToken)
                try {
                    const taskData =
                        await api.getAllTasksByCategoryId(selectedOption)

                    setTasks(taskData)
                } catch (error) {
                    console.log(error)
                }
        })()

        if (selectedOption) {
            api.getAllTasksByCategoryId(selectedOption)
        }
    }, [selectedOption, accessToken])

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

        category,

        handleCategorySelect,
        handleTaskSelect,
        tasks,
    }
}
