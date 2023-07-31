import { useContext, useEffect, useState } from 'react'

import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import useAuth from '../../../../../pages/landingPage/context/LandingPageContextProvider'

type EditTaskEntity = {
    categoryId: string
    description: string
}

export const useEditTaskForm = () => {
    const { idToken } = useAuth()

    const handleOpen = (
        taskId: string,
        taskDescription: string,
        categoryId: string
    ) => {
        setIsOpen(true)
        setTaskId(taskId)
        setCategoryId(categoryId)
        setTaskDescription(taskDescription)
    }
    const [isOpen, setIsOpen] = useState(false)
    const [taskId, setTaskId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useAddTaskForm()
    const handleClose = () => {
        setIsOpen(false)
    }

    const updateCheckListTask = async (data: {
        taskId: string
        description: string
        categoryId: string
    }) => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklistTask?id=${data.taskId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: data.description,
                    categoryId: data.categoryId,
                }),
            }
        )
        if (res.ok) setRefreshList((prev) => !prev)
        setIsOpen(false)
        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
    }

    return {
        setTaskId,
        handleOpen,
        handleClose,
        categoryId,
        taskDescription,
        taskId,
        isOpen,
        setIsOpen,
        updateCheckListTask,
    }
}
