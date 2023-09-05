import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import decode from 'jwt-decode'
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useLocation } from 'react-router'
import useAuth from '../../landingPage/context/LandingPageContextProvider'
import { useAddUser } from '../addUser/hooks/useAddUser'
import { Option } from '../context/models/OptionsEntity'
import { AzureUserInfo } from './models/AzureUserEntity'
import { UserEntity } from './models/UserEntity'
import { UserListEntity } from './models/UserListEntity'

export type ContextType = {
    result: UserEntity[]
    userList: UserListEntity[]
    options: Option[]
    currentUser: UserEntity | null
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
    currentUser: {
        createdDate: '',
        checklistWorkFlow: {
            id: '',
            checklistId: '',
            status: '',
            updatedDate: '',
            userId: '',
        },
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
        AzureAdUser: '',
    },
}

const UserContext = createContext<ContextType>(postsContextDefaultValue)

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [result, setResult] = useState<UserEntity[]>([])
    const { state } = useLocation()
    const newUserFunc = state ? state?.newUserFunc : null
    const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<UserEntity | null>(null)
    const [userList, setUserList] = useState<UserListEntity[]>([])
    const { idToken, accessToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)
    const [options, setOptions] = useState<Option[]>([])
    const { user } = useAddUser()

    const getUsers = async () => {
        const res = await fetch('https://turbinsikker-api-lin-prod.azurewebsites.net/Api/GetAllUsersAdmin',
        {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": '*'
            }})
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
    }, [newUserFunc, refreshUsers])

    // UserRoles

    useEffect(() => {
        const fetchUserRoles = async () => {
            const res = await fetch(
                'https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllUserRoles',
                {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": '*'
                    }}
            )
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
    }, [])
    // Delete user //

    const handleDeleteUser = async (id: string | undefined) => {
        await fetch(`https://turbinsikker-api-lin-prod.azurewebsites.net/api/SoftDeleteUser?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
              }
        })

        setRefreshUsers((prevRefresh) => !prevRefresh)
    }

    //azure

    const fetchUserAndUpdateContext = async (token: string) => {
        try {
            const userInfo = getUserInfoFromIdToken(token)
            await fetchUserByEmail(userInfo.preferredUserName, userInfo.name)
        } catch (error) {
            console.error('Error fetching and updating user:', error)
        }
    }
    function getUserInfoFromIdToken(token: string): {
        preferredUserName: string
        name: string
    } {
        const decodedToken: AzureUserInfo = decode(token)

        return {
            preferredUserName: decodedToken?.preferred_username || '',
            name: decodedToken.name || '',
        }
    }
    async function fetchUserByEmail(userEmail: string, name: string) {
        const response = await fetch(
            `https://turbinsikker-api-lin-prod.azurewebsites.net/Api/GetUserByAzureAdUserId?azureAdUserId=${userEmail}`,
            {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": '*'
                }}
        )
        if (response.ok) {
            const user = await response.json()
            // Use the fetched user and set the result state
            setCurrentUser(user)
        } else if (response.status === 404) {
            // User not found, create user
            const newUser = await createUser(userEmail, name)
            // Use the newly created user and set the result state
            if (newUser) {
                setCurrentUser(newUser)
            }
        } else {
            console.error('Error fetching user by email')
        }
    }
    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
        }
    }, [idToken])

    // azure fetch //
    async function createUser(userEmail: string, name: string) {
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
        try {
            const createUserResponse = await fetch(
                'https://turbinsikker-api-lin-prod.azurewebsites.net/Api/addUser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        "Access-Control-Allow-Origin": '*'
                    },
                    body: JSON.stringify({
                        azureAdUserId: userEmail,
                        firstName: firstName,
                        lastName: lastName,
                        userName: username,
                        email: userEmail,
                        // other user properties
                    }),
                }
            )
            console.log(
                'User creation response status:',
                createUserResponse.status
            )
            if (createUserResponse.status === 200) {
                //const newUser = await createUserResponse.json();
                await createUserResponse.json()

                //return newUser; // Return the newly created user
            } else {
                console.log(
                    'Error creating user:',
                    createUserResponse.statusText
                )
                return null // Return null if there's an error
            }
        } catch (error) {
            console.log('Error creating user:', error)
            return null // Return null if there's an error
        }
    }

    const memoedValue = useMemo(
        () => ({
            result,
            setResult,
            setRefreshUsers,
            refreshUsers,
            userList,
            setUserList,
            currentUser,
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
            currentUser,
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

function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { UserContext, UserContextProvider, useUserContext }
