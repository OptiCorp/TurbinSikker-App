import { InteractionStatus } from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import decode from 'jwt-decode'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import apiService from '../services/api'
import { ApiStatus, User } from '../services/apiTypes'
import { AzureUserInfo, GlobalContextType } from './types'
import { Progress, Typography } from '@equinor/eds-core-react'
import PageNotFound from '../pages/PageNotFound'
import { Loading } from '../components/loading/Loading'

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export function GlobalProvider({ children }: { children: ReactNode }): JSX.Element {
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})
    const api = apiService()
    const accountUsername = account?.username
    const accountname = account?.name
    const [idToken, setIdToken] = useState<string>('')
    const [accessToken, setAccessToken] = useState('')
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.LOADING)

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ['cc0af56e-ee49-46ce-aad6-010dce5bcbb6/User.Read'],
                account: accounts.at(0),
            }
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken)
                    setIdToken(tokenResponse.idToken)
                })
                .catch((err) => {
                    console.error(err)
                    instance.logoutRedirect()
                })
        }
    }, [account, inProgress, accounts, instance, accountname, accountUsername])

    async function createUser(userEmail: string, name: string) {
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
        try {
            const createUserResponse = await api.addUser({
                azureAdUserId: userEmail,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: userEmail,
            })
            console.log('User creation response status:', createUserResponse.status)
            if (createUserResponse.status === 200) {
                await createUserResponse.json()
            } else {
                console.log('Error creating user:', createUserResponse.statusText)
                return null
            }
        } catch (error) {
            console.log('Error creating user:', error)
            return null
        }
    }

    async function fetchUserByEmail(userEmail: string, name: string) {
        const response = await api.getUserByAzureAdUserId(userEmail)
        if (response) {
            const user = response

            setCurrentUser(user)
        } else if (!response) {
            const newUser = await createUser(userEmail, name)

            if (newUser) {
                setCurrentUser(newUser)
            }
        } else {
            console.error('Error fetching user by email')
        }
    }

    const fetchUserAndUpdateContext = async (token: string) => {
        setStatus(ApiStatus.LOADING)
        try {
            const userInfo = getUserInfoFromIdToken(token)
            await fetchUserByEmail(userInfo.preferredUserName, userInfo.name)
            setStatus(ApiStatus.SUCCESS)
        } catch (error) {
            console.error('Error fetching and updating user:', error)
            setStatus(ApiStatus.ERROR)
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

    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
        }
    }, [idToken])

    if (status === ApiStatus.LOADING) {
        return <Loading text="Loading .." />
    }

    if (status === ApiStatus.ERROR) {
        return <PageNotFound />
    }

    if (accounts.length) {
        return (
            <GlobalContext.Provider
                value={{
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    instance,
                    currentUser,
                }}
            >
                {children}
            </GlobalContext.Provider>
        )
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}

export default function useGlobal() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}