import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useLocation } from 'react-router'
import { API_URL } from '../../../config'
import useGlobal from '../../../context/globalContextProvider'
import { Option } from '../context/models/OptionsEntity'
import { UserEntity } from './models/UserEntity'
import { UserListEntity } from './models/UserListEntity'
export type ContextType = {
    result: UserEntity[]
    userList: UserListEntity[]
    options: Option[]

    refreshUsers: boolean
    setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteUser: (id: string | undefined) => void
}

export const postsContextDefaultValue: ContextType = {
    result: [],
    refreshUsers: false,
    setRefreshUsers: () => {},
    handleDeleteUser: () => {},
    options: [],
    userList: [],
    // currentUser: {
    //     createdDate: '',
    //     checklistWorkFlow: {
    //         id: '',
    //         checklistId: '',
    //         status: '',
    //         updatedDate: '',
    //         userId: '',
    //     },
    //     email: '',
    //     firstName: '',
    //     id: '',
    //     lastName: '',
    //     status: '',
    //     updatedDate: '',
    //     userRole: {
    //         id: '',
    //         name: '',
    //     },
    //     userRoleId: '',
    //     username: '',
    //     AzureAdUser: '',
    // },
}

const UserContext = createContext<ContextType>(postsContextDefaultValue)

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<UserEntity[]>([])
    const { state } = useLocation()
    const newUserFunc = state ? state?.newUserFunc : null
    const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false)

    const [userList, setUserList] = useState<UserListEntity[]>([])
    const { idToken, accessToken } = useGlobal()

    const [options, setOptions] = useState<Option[]>([])

    const getUsers = async () => {
        if (!accessToken) return

        const res = await fetch(`${API_URL}/GetAllUsersAdmin `, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
        const data = await res.json()
        setResult(data)
        const userList = data.map(
            ({ id, username }: { id: string; username: string }) => ({
                value: id,
                label: username,
            })
        )
        setUserList(userList)
    }

    useEffect(() => {
        getUsers()
    }, [newUserFunc, refreshUsers, accessToken])

    // UserRoles

    useEffect(() => {
        const fetchUserRoles = async () => {
            if (!accessToken) return
            const res = await fetch(`${API_URL}/GetAllUserRoles  `, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()

            const options = data.map(
                ({ id, name }: { id: string; name: string }) => ({
                    value: id,
                    label: name,
                })
            )
            setOptions(options)
        }
        fetchUserRoles()
    }, [accessToken])
    // Delete user //

    const handleDeleteUser = async (id: string | undefined) => {
        if (!accessToken) return
        await fetch(`${API_URL}/SoftDeleteUser?id=${id}  `, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })

        setRefreshUsers((prevRefresh) => !prevRefresh)
    }

    //azure

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
            userList,
            setUserList,

            options,
            handleDeleteUser,
        }),
        [
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
            userList,
            setUserList,

            options,
            handleDeleteUser,
        ]
    )

    return (
        <UserContext.Provider value={memoedValue}>
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { UserContext, UserContextProvider, useUser }
