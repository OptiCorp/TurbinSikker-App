import { useContext, useState } from 'react'

import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useNavigate } from 'react-router'
import { useApiContext } from '../../../../../pages/context/apiContextProvider'
import useAuth from '../../../../../pages/landingPage/context/LandingPageContextProvider'

export const useEditTaskForm = () => {
    const { idToken } = useAuth()

    const navigate = useNavigate()
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
    const [title, setTitle] = useState('')
    const [listId, setListId] = useState('')
    const [status, setStatus] = useState('')
    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useApiContext()
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

    const handleSave = async (data: {
        listId: string
        title: string
        status: string
    }) => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklist?id=${data.listId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    status: data.status,
                }),
            }
        )

        if (res.ok) setRefreshList((prev) => !prev)
        setIsOpen(false)
        navigate('/MyChecklists')
        if (openSnackbar) {
            openSnackbar(`Checklist updated`)
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
