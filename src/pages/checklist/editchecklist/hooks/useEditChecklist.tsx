import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, Task } from '../../../../services/apiTypes'
import { useRoles } from '../../../../services/useRoles'

export const useEditChecklist = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }
    const { isLeader } = useRoles()
    const [task, setTask] = useState<Task | undefined>()

    const [checklist, setChecklist] = useState<Checklist>()
    const { currentUser, openSnackbar, refreshList, setRefreshList } =
        useGlobal()
    const [headerOpen, setHeaderOpen] = useState(false)
    const api = apiService()
    const [tasks, setTasks] = useState<Task[]>([])

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
    }, [currentUser?.id, id, refreshList])

    useEffect(() => {
        if (checklist && checklist?.checklistTasks?.length === 0) {
            setHeaderOpen(true)
        }
    }, [checklist])

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
            if (openSnackbar) openSnackbar('Task updated')
            setRefreshList((prev) => !prev)
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await api.deleteChecklist(id)

            if (res.ok) {
                setDialogDelete(false)
                if (openSnackbar) openSnackbar('Checklist deleted')
                navigate('/Checklists')
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    const handleSave = async (data: { title: string; status: string }) => {
        if (!currentUser) return

        try {
            const res = await api.updateChecklist(id, data.title, data.status)
            if (res.ok) {
                if (openSnackbar) openSnackbar('Checklist updated')
                navigate('/MyChecklists', {
                    state: { isLeader },
                })
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    return {
        handleSave,
        handleDelete,
        handleUpdateTask,

        task,
        tasks,
        setTask,
        checklist,
        headerOpen,
        setHeaderOpen,
        dialogDelete,
        setDialogDelete,
    }
}
