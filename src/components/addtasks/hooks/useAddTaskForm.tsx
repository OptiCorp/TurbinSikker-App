import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { API_URL } from '../../../config'
import useAuth from '../../../context/AuthContextProvider'

import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'

import { Checklist } from '../../../services/apiTypes'
import { SnackbarContext } from '../../snackbar/SnackBarContext'
import { FormValuesEntity } from '../context/models/FormValuesEntity'
import { TaskEntity } from '../context/models/TaskEntity'
export const useAddTaskForm = () => {
    const { id } = useParams() as { id: string }

    const appLocation = useLocation()
    const methods = useForm<FormValuesEntity>()
    const { reset, watch, handleSubmit, register, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useCheckListContext()
    const [selectedOption] = useState('')
    const [selectedTask] = useState('')
    const [checkListById, setCheckListById] = useState<Checklist | null>(null)
    const { accessToken } = useAuth()
    const [sortedTasks, setSortedTasks] = useState<TaskEntity>()

    const { workflowId } = useParams()

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
