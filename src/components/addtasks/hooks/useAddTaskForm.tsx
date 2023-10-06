import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'

import apiService from '../../../services/api'
import {
    ApiStatus,
    Checklist,
    Task,
    TaskPicker,
} from '../../../services/apiTypes'
import { SnackbarContext } from '../../snackbar/SnackBarContext'
import { FormValuesEntity } from '../context/models/FormValuesEntity'

type ChecklistAndTasks = Checklist & TaskPicker

export type CategoryTaskSelector = {
    value: string
    label: string
}

type Test = {
    value: string
    label: string
    id: string
    description: string
    category: { id: string; name: string }
}

type TaskChooser = CategoryTaskSelector & Task

export const useAddTaskForm = () => {
    const { id } = useParams() as { id: string }
    const [tasks, setTasks] = useState<Task[]>([])
    const { checklistId, taskId } = useParams()
    const appLocation = useLocation()
    const { currentUser } = useGlobal()
    const methods = useForm<FormValuesEntity>()
    const { reset, watch, handleSubmit, register, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = apiService()
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [checkListById, setCheckListById] =
        useState<ChecklistAndTasks | null>(null)
    const { accessToken } = useGlobal()

    const api = apiService()
    const [category, setCategory] = useState<CategoryTaskSelector[]>([])
    const [categoryStatus, setCategoryStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
    const [taskStatus, setTaskStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const { workflowId } = useParams()

    const handleCategorySelect = (selectedCategory: string) => {
        setSelectedOption(selectedCategory)
    }

    const handleTaskSelect = (selectedTask: any) => {
        setSelectedTask(selectedTask.value)
    }

    const onSubmit: SubmitHandler<FormValuesEntity> = async (data) => {
        const api = apiService()
        if (!currentUser || !checklistId || !taskId) return
        try {
            api.addTaskToChecklist(checklistId, data.task)

            setRefreshList((prev) => !prev)

            if (openSnackbar) {
                openSnackbar('Task added!')
            }
        } catch (error) {
            console.error('Error adding task:', error)
        }
    }

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!accessToken || !category)
                try {
                    const categoryData = await api.getAllCategories()
                    const category = categoryData.map(
                        ({ id, name }: { id: string; name: string }) => ({
                            value: id,
                            label: name,
                        })
                    )
                    setCategory(category)
                    setTaskStatus(ApiStatus.SUCCESS)
                } catch (error) {
                    setTaskStatus(ApiStatus.ERROR)
                }
        })()
    }, [accessToken])

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!category)
                try {
                    const taskData =
                        await api.getAllTasksByCategoryId(selectedOption)

                    setTasks(taskData)

                    setTaskStatus(ApiStatus.SUCCESS)
                } catch (error) {
                    setTaskStatus(ApiStatus.ERROR)
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
        checkListById,
        handleCategorySelect,
        handleTaskSelect,
        tasks,
    }
}
