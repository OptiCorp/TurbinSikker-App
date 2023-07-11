import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { useLocation } from 'react-router'
import { Category } from 'src/models/CategoryEntity'

import { TaskEntity } from 'src/models/TaskEntity'

export type ContextType = {
    result: IUser[]
    userIdCheckList: ICheckListUserID[]
    allCheckList: ICheckList[]
    refreshUsers: boolean
    setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>
    category: Category[]
    tasks: TaskEntity[]
    selectedTask: string
    refreshList: boolean
    selectedOption: string
    handleSelectTask: React.Dispatch<React.SetStateAction<string>>
    handleCategorySelect: React.Dispatch<React.SetStateAction<string>>
}

export type ICheckList = {
    id: string
    title: string
    status: string
    createdDate: string
    user: {
        createdDate: string

        email: string
        firstName: string
        id: string
        lastName: string
        status: number
        updatedDate: string
        userRole: null
        userRoleId: string
        username: string
    }
}

export type ICheckListUserID = {
    id: string
    title: string
    status: string
    createdDate: string
    updatedDate: string
}

export const checkList: ICheckList = {
    id: '',
    title: '',
    status: '',
    createdDate: '',
    user: {
        createdDate: '',

        email: '',
        firstName: '',
        id: '',
        lastName: '',
        status: 0,
        updatedDate: '',
        userRole: null,
        userRoleId: '',
        username: '',
    },
}

export type IUser = {
    status: string
    email: string
    firstName: string
    lastName: string
    id: string
    userRole: { id: string; name: string }
    username: string
    createdDate: string
    updatedDate: string | null
}

export const postsContextDefaultValue: ContextType = {
    result: [],
    userIdCheckList: [],
    allCheckList: [],
    refreshUsers: false,
    setRefreshUsers: () => {},
    category: [],
    tasks: [],
    selectedTask: '',
    refreshList: false,
    selectedOption: '',
    handleSelectTask: () => {},
    handleCategorySelect: () => {},
}

const ApiContext = createContext<ContextType>(postsContextDefaultValue)

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<IUser[]>([])
    const { state } = useLocation()
    const newUser = state ? state?.newUser : null
    const refreshCheckLists = state ? state?.refreshCheckLists : null
    const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false)
    const [allCheckList, setAllCheckList] = useState<ICheckList[]>([])
    const [userIdCheckList, setUserIdCheckList] = useState<ICheckListUserID[]>(
        []
    )

    const [refreshList, setRefreshList] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TaskEntity[]>([])
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [category, setCategory] = useState<Category[]>([])

    const handleCategorySelect = (selectedCategory: any) => {
        setSelectedOption(selectedCategory.value)
    }

    const handleSelectTask = (task: any) => {
        setSelectedTask(task)
    }

    const getUsers = async () => {
        const res = await fetch(
            'http://20.251.37.226:8080/Api/GetAllUsersAdmin'
        )
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
    }

    useEffect(() => {
        getUsers()
        // findById()
    }, [newUser, refreshUsers])

    const fetchCheckLists = async () => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/GetAllChecklists`
        )
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()

        setAllCheckList(data)
    }

    useEffect(() => {
        fetchCheckLists()
        // findById()
    }, [refreshCheckLists])

    const fetchCheckListUserId = async () => {
        try {
            const res = await fetch(
                `http://20.251.37.226:8080/api/GetAllChecklistsByUserId?id=3dc14bce-7e99-4a9f-a8e7-83febaefc64b`
            )
            if (!res.ok) {
                throw new Error('Failed with HTTP code ' + res.status)
            }
            const data = await res.json()
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    useEffect(() => {
        fetchCheckListUserId()
            .then((data) => {
                setUserIdCheckList(data)
            })
            .catch((error) => {
                console.error(error)
                console.log(setUserIdCheckList)
            })
    }, [])

    useEffect(() => {
        fetchCheckListUserId()
    }, [refreshCheckLists])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(
                'http://20.251.37.226:8080/api/GetAllCategories'
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()

            const category = data.map((item: any) => ({
                value: item.id,
                label: item.name,
            }))
            setCategory(category)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(
                `http://20.251.37.226:8080/api/GetAllTasksByCategoryId?id=${selectedOption}`
            )
            const data = await res.json()

            const tasks = data.map((task: any) => ({
                value: task.id,
                label: task.description,
            }))
            setTasks(tasks)
        }

        if (selectedOption) {
            fetchTasks()
        }
    }, [selectedOption])

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
            setAllCheckList,
            allCheckList,
            userIdCheckList,
            setUserIdCheckList,
            fetchCheckLists,

            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            handleSelectTask,
            handleCategorySelect,
            selectedTask,
            refreshList,
            setSelectedTask,
            setSelectedOption,
        }),
        [
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
            setAllCheckList,
            allCheckList,
            userIdCheckList,
            setUserIdCheckList,
            fetchCheckLists,

            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            handleSelectTask,
            handleCategorySelect,
            selectedTask,
            refreshList,
            setSelectedTask,
            setSelectedOption,
        ]
    )

    return (
        // the Provider gives access to the context to its children
        <ApiContext.Provider value={memoedValue}>
            {children}
        </ApiContext.Provider>
    )
}

function useApiContext() {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { ApiContext, ApiContextProvider, useApiContext }
