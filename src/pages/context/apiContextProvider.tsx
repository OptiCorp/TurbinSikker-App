import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { useLocation } from 'react-router'
import { Category } from 'src/models/CategoryEntity'
import { CheckListEntity } from 'src/models/CheckListEntity'
import { ListEntity } from 'src/models/ListEntity'
import { TaskEntity } from 'src/models/TaskEntity'
import { UserEntity } from 'src/models/UserEntity'
import { UserListEntity } from 'src/models/UserListEntity'
import { IUser } from '../users/addUser/hooks/useAddUser/types'

export type ContextType = {
    result: UserEntity[]
    userIdCheckList: ICheckListUserID[]
    allCheckList: CheckListEntity[]
    refreshUsers: boolean
    setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>
    category: Category[]
    tasks: TaskEntity[]
    userList: UserListEntity[]
    list: ListEntity[]
    selectedTask: string
    refreshList: boolean
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>
    selectedOption: string
    handleTaskSelect: (task: string) => void
    handleCategorySelect: (category: string) => void
}

export type ICheckListUserID = {
    id: string
    title: string
    status: string
    createdDate: string
    updatedDate: string
}

export const checkList: CheckListEntity = {
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
        status: '',
        updatedDate: '',
        userRole: {
            id: '',
            name: '',
        },
        userRoleId: '',
        username: '',
    },
    tasks: [],
}

export interface Option {
    value: string
    label: string
}

export const postsContextDefaultValue: ContextType = {
    result: [],
    userIdCheckList: [],
    allCheckList: [],
    refreshUsers: false,
    setRefreshUsers: () => {},
    list: [],
    userList: [],
    category: [],
    tasks: [],
    selectedTask: '',
    refreshList: false,
    setRefreshList: () => {},
    selectedOption: '',
    handleTaskSelect: () => {},
    handleCategorySelect: () => {},
}

const ApiContext = createContext<ContextType>(postsContextDefaultValue)

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<UserEntity[]>([])
    const { state } = useLocation()
    const newUser = state ? state?.newUser : null
    const refreshCheckLists = state ? state?.refreshCheckLists : null
    const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false)
    const [allCheckList, setAllCheckList] = useState<CheckListEntity[]>([])
    const [userIdCheckList, setUserIdCheckList] = useState<ICheckListUserID[]>(
        []
    )

    const [refreshList, setRefreshList] = React.useState<boolean>(false)
    const [tasks, setTasks] = useState<TaskEntity[]>([])
    const [list, setList] = useState<ListEntity[]>([])
    const [userList, setUserList] = useState<UserListEntity[]>([])
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTask, setSelectedTask] = useState('')
    const [category, setCategory] = useState<Category[]>([])

    const handleCategorySelect = (selectedCategory: string) => {
        setSelectedOption(selectedCategory)
    }

    const handleTaskSelect = (selectedTask: any) => {
        setSelectedTask(selectedTask.value)
    }

    const getUsers = async () => {
        const res = await fetch(
            'http://20.251.37.226:8080/Api/GetAllUsersAdmin'
        )
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
        const userList = data.map((item: any) => ({
            value: item.id,
            label: item.username,
        }))
        setUserList(userList)
    }

    useEffect(() => {
        getUsers()
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
    }, [refreshCheckLists])

    const fetchCheckListUserId = async () => {
        try {
            const res = await fetch(
                `http://20.251.37.226:8080/api/GetAllChecklistsByUserId?id=55ba8118-5880-4abf-afb4-44bbb7ac1a4c`
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

                const list = data.map((item: any) => ({
                    value: item.id,
                    label: item.title,
                }))
                setList(list)
            })
            .catch((error) => {
                console.error(error)
                console.log(setUserIdCheckList)
            })
    }, [refreshList])

    useEffect(() => {
        fetchCheckListUserId()
    }, [refreshCheckLists, refreshList])

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
            refreshCheckLists,
            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            setRefreshList,
            handleTaskSelect,
            handleCategorySelect,
            selectedTask,
            refreshList,
            setSelectedTask,
            setSelectedOption,
            list,
            setList,
            userList,
            setUserList,
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
            setRefreshList,
            refreshCheckLists,
            selectedOption,
            tasks,
            setTasks,
            category,
            setCategory,
            handleTaskSelect,
            handleCategorySelect,
            selectedTask,
            refreshList,
            setSelectedTask,
            setSelectedOption,
            list,
            setList,
            userList,
            setUserList,
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
