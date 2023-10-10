import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import useGlobal from '../../../context/globalContextProvider'

import apiService from '../../../services/api'
import { Category, Task } from '../../../services/apiTypes'

export type CategoryTaskSelector = {
    value: string
    label: string
}

type FormData = {
    id: string
}

export const useAddTaskForm = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const { id: checklistId } = useParams() as { id: string }
    const appLocation = useLocation()
    const { currentUser } = useGlobal()
    const methods = useForm<FormData>()
    const { reset, watch, handleSubmit, register, control, setValue } = methods
    const [selectedOption, setSelectedOption] = useState('')
    const { accessToken } = useGlobal()
    const api = apiService()
    const [category, setCategory] = useState<Category[]>([])

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            await api.addTaskToChecklist(data.id, checklistId)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!accessToken || !category || !currentUser?.id) return
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
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        ;(async (): Promise<void> => {
            if (!accessToken || !selectedOption || !currentUser?.id) return
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
    }, [selectedOption, accessToken, currentUser?.id])

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        location: appLocation.pathname,
        setSelectedOption,
        category,
        tasks,
    }
}
