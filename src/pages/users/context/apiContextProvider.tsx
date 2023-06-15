import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react'

export type ContextType = {
    result: IUser[]
    userById: IUser[]
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
    userById: [],
}

const ApiContext = createContext<ContextType>(postsContextDefaultValue)

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<IUser[]>([])
    const [userById, setUserById] = useState<IUser[]>([])

    const getUsers = async () => {
        const res = await fetch('https://localhost:7290/Api/GetAllUsers')
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
    }

    useEffect(() => {
        getUsers()
        // findById()
    }, [])

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,

            userById,
            setUserById,
        }),
        [result, setResult, userById, setUserById]
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
