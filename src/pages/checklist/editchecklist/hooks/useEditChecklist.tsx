import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, Task } from '../../../../services/apiTypes'

export const useEditChecklist = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }

    const [task, setTask] = useState<Task | undefined>()
    const [taskId, setTaskId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [title, setTitle] = useState<Checklist | string>()
    const [checklist, setChecklist] = useState<Checklist>()
    const { accessToken, currentUser } = useGlobal()
    const [headerOpen, setHeaderOpen] = useState(false)
    const [isOpenNew, setIsOpenNew] = useState(false)
    const api = apiService()

    const handleOpen = (
        taskId: string,
        taskDescription: string,
        categoryId: string
    ) => {
        setTaskId(taskId)
        setCategoryId(categoryId)
        setTaskDescription(taskDescription)
    }

    // useEffect(() => {
    //     if (!currentUser?.id || !accessToken) return
    //     ;async (): Promise<void> => {
    //         try {
    //             const checklistData = await api.getChecklist(id)
    //             setChecklist(checklistData)
    //             console.log(checklistData)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (checklist && checklist?.checklistTasks?.length === 0) {
            setHeaderOpen(true)
        }
    }, [checklist])

    const handleTitleChange = (title: string) => {
        setTitle(title)
    }

    const handleCloseNewCheckList = () => {
        setIsOpenNew(false)
    }

    const handleUpdateTask = async (data: {
        description: string
        categoryId: string
        taskId: string
        checklistId: string
    }) => {
        try {
            if (!currentUser) return
            await api.updateTask(
                data.taskId,
                data.categoryId,
                data.description,
                data.checklistId
            )

            setDialogShowing(false)
        } catch (error) {
            if (error) return
            console.log(error)
        } finally {
        }
    }

    const handleDelete = async () => {
        try {
            await api.deleteChecklist(id)
        } catch (error) {
            if (error) return
            console.log(error)
        } finally {
        }
    }

    const handleSave = async (data: { title: string; status: string }) => {
        if (!currentUser) return

        try {
            await api.updateChecklist(id, data.title, data.status)
        } catch (error) {
            if (error) return
            console.log(error)
        } finally {
            navigate('/MyChecklists')
        }
    }

    return {
        handleSave,
        handleDelete,
        handleUpdateTask,
        handleCloseNewCheckList,
        handleTitleChange,
        handleOpen,
        title,
        task,
        setTask,
        checklist,
        headerOpen,
        setHeaderOpen,
    }
}
