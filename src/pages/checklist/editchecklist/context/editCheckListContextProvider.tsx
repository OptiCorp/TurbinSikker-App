import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useLocation, useNavigate, useParams } from 'react-router'

import { TaskEntity } from '../../../../components/addtasks/context/models/TaskEntity'
import { useAddTaskForm } from '../../../../components/addtasks/hooks/useAddTaskForm'
import { useCheckListContext } from '../../../../pages/context/CheckListContextProvider'
import { CheckListEntity } from '../../../context/models/CheckListEntity'
import useAuth from '../../../landingPage/context/LandingPageContextProvider'

export type ContextType = {
    task: TaskEntity | any
    setTask: React.Dispatch<any>
    taskId: string
    categoryId: string
    taskDescription: string
    handleOpen: (
        taskId: string,
        taskDescription: string,
        categoryId: string
    ) => void
    updateCheckListTask: (data: {
        taskId: string
        description: string
        categoryId: string
    }) => void
    handleSave: (data: { title: string; status: string }) => void
    handleDelete: (id: string | undefined) => void
    title: CheckListEntity | any
    handleTitleChange: (title: string) => void
    isOpenn: boolean
    setIsOpenn: (isOpenn: boolean) => void
    isOpenNew: boolean
    setIsOpenNew: (isOpenNew: boolean) => void
    handleCloseNewCheckList: (setIsOpenNew: boolean) => void
}

export const postsContextDefaultValue: ContextType = {
    task: '',
    setTask: () => {},
    handleOpen: () => {},
    handleDelete: () => {},
    categoryId: '',
    taskDescription: '',
    taskId: '',
    updateCheckListTask: () => {},
    handleSave: () => {},
    title: [],
    handleTitleChange: () => {},
    isOpenn: false,
    isOpenNew: false,
    handleCloseNewCheckList: () => {},
    setIsOpenn: () => {},
    setIsOpenNew: () => {},
}

const EditCheckListContext = createContext<ContextType>(
    postsContextDefaultValue
)

const EditCheckListContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { checkListId } = useAddTaskForm()
    const { id } = useParams()
    const navigate = useNavigate()
    const { setRefreshList } = useCheckListContext()
    const { idToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)

    const [task, setTask] = useState<TaskEntity | any>()
    const [taskId, setTaskId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [title, setTitle] = useState<CheckListEntity | any>()

    const [isOpenn, setIsOpenn] = useState(false)
    const [isOpenNew, setIsOpenNew] = useState(false)

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
        if (checkListId && checkListId.tasks.length === 0) {
            setIsOpenn(true)
        }
    }, [checkListId])

    const handleTitleChange = (title: string) => {
        setTitle(title)
    }

    const handleCloseNewCheckList = () => {
        setIsOpenNew(false)
    }

    const updateCheckListTask = async (data: {
        taskId: string
        description: string
        categoryId: string
    }) => {
        const res = await fetch(
            `https://localhost:7290/api/UpdateChecklistTask?id=${data.taskId}`,
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

        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
    }

    const handleSave = async (data: { title: string; status: string }) => {
        const res = await fetch(
            `https://localhost:7290/api/UpdateChecklist?id=${id}`,
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
        navigate('/MyChecklists')

        if (openSnackbar) {
            openSnackbar(`Checklist updated`)
            setTimeout(() => openSnackbar(''), 3000)
        }
    }

    const handleDelete = async (id: string | undefined) => {
        await fetch(`https://localhost:7290/api/DeleteChecklist?id=${id}`, {
            method: 'DELETE',
        })
        setRefreshList((prev) => !prev)
    }

    const memoedValue = useMemo(
        () => ({
            setTaskId,
            task,
            setTask,
            handleOpen,
            categoryId,
            taskDescription,
            taskId,
            updateCheckListTask,
            handleSave,
            title,
            setTitle,
            handleTitleChange,
            isOpenn,
            setIsOpenn,
            isOpenNew,
            setIsOpenNew,
            handleCloseNewCheckList,
            handleDelete,
        }),

        [
            setTaskId,
            task,
            setTask,
            handleOpen,
            categoryId,
            taskDescription,
            taskId,
            updateCheckListTask,
            handleSave,
            title,
            setTitle,
            handleTitleChange,
            isOpenn,
            setIsOpenn,
            isOpenNew,
            setIsOpenNew,
            handleCloseNewCheckList,
            handleDelete,
        ]
    )

    return (
        // the Provider gives access to the context to its children
        <EditCheckListContext.Provider value={memoedValue}>
            {children}
        </EditCheckListContext.Provider>
    )
}

function useEditCheckListContext() {
    const context = useContext(EditCheckListContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export {
    EditCheckListContext,
    EditCheckListContextProvider,
    useEditCheckListContext,
}