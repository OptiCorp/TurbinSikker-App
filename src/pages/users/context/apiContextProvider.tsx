import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react'
import { useLocation } from 'react-router'

export type ContextType = {
    result: IUser[]
    refreshUsers: boolean
    setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>
}

type IUser = {
    email: string
    firstName: string
    lastName: string
    id: string
    userRoleId: string
    username: string
}

export const postsContextDefaultValue: ContextType = {
    result: [],
    refreshUsers: false,
    setRefreshUsers: () => {},
}

const ApiContext = createContext<ContextType>(postsContextDefaultValue)

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<IUser[]>([])

    const { state } = useLocation()
    const newUser = state ? state?.newUser : null
    const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false)

    const getUsers = async () => {
        const res = await fetch('https://localhost:7290/Api/GetAllUsers')
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
    }

    useEffect(() => {
        getUsers()
        // findById()
    }, [newUser, refreshUsers])

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
        }),
        [result, setResult, setRefreshUsers, refreshUsers]
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
