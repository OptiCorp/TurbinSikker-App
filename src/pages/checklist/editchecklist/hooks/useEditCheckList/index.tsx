import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CheckListEntity } from 'src/models/CheckListEntity'
import { TaskEntity } from 'src/models/TaskEntity'
import { useApiContext } from '../../../../context/apiContextProvider'
import useAuth from '../../../../landingPage/context/LandingPageContextProvider'

export const useEditCheckList = () => {
    const { idToken } = useAuth()
    const { checkListId } = useAddTaskForm()
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
    const [task, setTask] = useState<TaskEntity>()
    const [taskId, setTaskId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [title, setTitle] = useState<CheckListEntity | any>()
    const [isOpenn, setIsOpenn] = useState(false)
    const [isOpenTask, setIsOpenTask] = useState(false)

    const [changeTitle, setChangeTitle] = useState('')
    const { id } = useParams()

    const handleTitleChange = (title: string) => {
        setTitle(title)
    }

    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useApiContext()
    const handleClose = () => {
        setIsOpen(false)
    }
    const [checked, setChecked] = useState(!!checkListId?.status)

    const [isOpenNew, setIsOpenNew] = useState(false)

    const handleCloseNewCheckList = () => {
        setIsOpenNew(false)
    }

    useEffect(() => {
        setChecked(checkListId?.status === 'Active')
    }, [checkListId])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    useEffect(() => {
        if (checkListId && checkListId.tasks.length === 0) {
            setIsOpenn(true)
        }
    }, [checkListId])

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
        setIsOpenTask(false)
        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
    }

    const handleSave = async (data: { title: string; status: string }) => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklist?id=${id}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title || title,
                    status: data.status,
                }),
            }
        )
        if (res.ok) {
            setRefreshList((prev) => !prev)
        }
        navigate('/MyCheckLists')

        if (openSnackbar) {
            openSnackbar(`Checklist updated`)
        }
    }

    return {
        setTaskId,
        task,
        setTask,
        handleOpen,
        handleClose,
        categoryId,
        taskDescription,
        taskId,
        isOpen,
        setIsOpen,
        updateCheckListTask,
        handleSave,
        title,
        setTitle,
        changeTitle,
        setChangeTitle,
        handleTitleChange,
        checked,
        setChecked,
        convertStatusToString,
        isOpenn,
        setIsOpenn,
        isOpenTask,
        setIsOpenTask,

        isOpenNew,
        setIsOpenNew,
        handleCloseNewCheckList,
    }
}
