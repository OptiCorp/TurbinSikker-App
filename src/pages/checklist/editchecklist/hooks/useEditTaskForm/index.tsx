import { useState } from 'react'

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

    const handleClose = () => {
        setIsOpen(false)
    }

    const updateCheckList = async (data: {
        taskId: string
        description: string
        categoryId: string
    }) => {
        const { idToken } = useAuth()
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklistTask?id=${taskId}`,
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
        return res
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
        updateCheckList,
    }
}
