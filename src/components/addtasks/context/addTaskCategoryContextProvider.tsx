import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { useParams } from 'react-router'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { CheckListEntity } from '../../../pages/context/models/CheckListEntity'
import { SnackbarContext } from '../../snackbar/SnackBarContext'
import { Category } from './models/CategoryEntity'
import { TaskEntity } from './models/TaskEntity'

export type ContextType = {
    category: Category[]
    tasks: TaskEntity[]
    selectedTask: string
    selectedOption: string
    handleTaskSelect: (task: string) => void
    handleCategorySelect: (category: string) => void
}

export const postsContextDefaultValue: ContextType = {
    category: [],
    tasks: [],
    selectedTask: '',
    selectedOption: '',
    handleTaskSelect: () => {},
    handleCategorySelect: () => {},
}

const TaskCategoryContext = createContext<ContextType>(postsContextDefaultValue)

const TaskCategoryContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [tasks, setTasks] = useState<TaskEntity[]>([])
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [category, setCategory] = useState<Category[]>([])
    const handleCategorySelect = (selectedCategory: string) => {
        setSelectedOption(selectedCategory)
    }

    const handleTaskSelect = (selectedTask: any) => {
        setSelectedTask(selectedTask.value)
    }
    const [checkListId, setCheckListId] = useState<CheckListEntity | null>(null)
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])
    const { openSnackbar } = useContext(SnackbarContext)
    const { refreshList, setRefreshList } = useCheckListContext()
    const { id } = useParams()
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                'https://localhost:7290/api/GetAllCategories'
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()

            const category = data.map(
                ({ id, name }: { id: string; name: string }) => ({
                    value: id,
                    label: name,
                })
            )
            setCategory(category)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(
                `https://localhost:7290/api/GetAllTasksByCategoryId?id=${selectedOption}`
            )
            const data = await res.json()

            const tasks = data.map(
                ({ id, description }: { id: string; description: string }) => ({
                    value: id,
                    label: description,
                })
            )
            setTasks(tasks)
        }

        if (selectedOption) {
            fetchTasks()
        }
    }, [selectedOption])

    const memoedValue = useMemo(
        () => ({
            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            handleTaskSelect,
            handleCategorySelect,
            selectedTask,
            setSelectedTask,
            setSelectedOption,

            sortedTasks,
            checkListId,
        }),
        [
            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            handleTaskSelect,
            handleCategorySelect,
            selectedTask,
            setSelectedTask,
            setSelectedOption,

            sortedTasks,
            checkListId,
        ]
    )

    return (
        // the Provider gives access to the context to its children
        <TaskCategoryContext.Provider value={memoedValue}>
            {children}
        </TaskCategoryContext.Provider>
    )
}

function useTaskCategoryContext() {
    const context = useContext(TaskCategoryContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export {
    TaskCategoryContext,
    TaskCategoryContextProvider,
    useTaskCategoryContext,
}
