import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, Task } from '../../../../services/apiTypes'

export const useEditChecklist = () => {
    const navigate = useNavigate()
    // const [dialogDelete, setDialogDelete] = useState(false)
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
    const [tasks, setTasks] = useState<Task[]>([])
    const handleOpen = (
        taskId: string,
        taskDescription: string,
        categoryId: string
    ) => {
        setTaskId(taskId)
        setCategoryId(categoryId)
        setTaskDescription(taskDescription)
    }

    useEffect(() => {
        if (!currentUser?.id || !id) return

        const fetchChecklist = async () => {
            try {
                const checklistData = await api.getChecklist(id)

                setChecklist(checklistData)
                if (checklistData?.checklistTasks) {
                    setTasks(checklistData.checklistTasks)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchChecklist()
    }, [currentUser?.id, id])

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
        estAvgCompletionTime: number
    }) => {
        try {
            if (!currentUser) return
            await api.updateTask(
                data.taskId,
                data.categoryId,
                data.description,
                data.checklistId,
                data.estAvgCompletionTime
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
            navigate('/Checklists')
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
            navigate('/Checklists')
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
        tasks,

        setTask,
        checklist,
        headerOpen,
        setHeaderOpen,
    }
}
