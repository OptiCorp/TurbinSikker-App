import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { API_URL } from '../../../config'
import useAuth from '../../../context/AuthContextProvider'

import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'

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

    const appLocation = useLocation()
    const methods = useForm<FormValuesEntity>()
    const { reset, watch, handleSubmit, register, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useCheckListContext()
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [checkListById, setCheckListById] =
        useState<ChecklistAndTasks | null>(null)
    const { accessToken } = useAuth()

    const api = apiService(accessToken)
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
        const res = await fetch(`${API_URL}/AddTaskToChecklist?checklistId`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                checklistId: id,
                id: data.task,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)

        if (openSnackbar) {
            openSnackbar('Task added!')
        }
    }
    useEffect(() => {
        const fetchAllCheckListsId = async () => {
            if (!id || !accessToken || workflowId) return
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

                const data = await res.json()
                setCheckListById(data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchAllCheckListsId()
    }, [refreshList, accessToken, id])

    useEffect(() => {
        if (!accessToken) return
        ;(async (): Promise<void> => {
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
        if (!accessToken) return
        ;(async (): Promise<void> => {
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
