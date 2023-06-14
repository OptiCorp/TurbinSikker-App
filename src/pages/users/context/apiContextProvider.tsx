import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react'

export type ContextType = {
    result: IUser[]
}

type IUser = {
    email: string
    first_name: string
    last_name: string
    id: string
    role_id: string

    username: string
}

export const postsContextDefaultValue: ContextType = {
    result: [],
}

const ApiContext = createContext<ContextType>(postsContextDefaultValue)

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<IUser[]>([])
    const [makeUser, setMakeUser] = useState('')

    const getUsers = async () => {
        const res = await fetch('https://localhost:7290/Api/GetAllUsers')
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,

            makeUser,
            setMakeUser,
        }),
        [result, setResult, makeUser, setMakeUser]
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
