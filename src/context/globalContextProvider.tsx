import { InteractionStatus } from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import decode from 'jwt-decode'
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Loading } from '../components/loading/Loading'
import PageNotFound from '../pages/pageNotFound'
import apiService from '../services/api'
import { ApiStatus, User, pubSubToken } from '../services/apiTypes'
import { AzureUserInfo, GlobalContextType } from './types'

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export function GlobalProvider({
    children,
}: {
    children: ReactNode
}): JSX.Element {
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})
    const api = apiService()
    const accountUsername = account?.username
    const accountname = account?.name
    const [idToken, setIdToken] = useState<string>('')
    const [accessToken, setAccessToken] = useState('')
    const [pubSubToken, setPubSubToken] = useState<string>("")
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const [snackbarText, setSnackbarText] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [refreshList, setRefreshList] = useState<boolean>(false)
    const openSnackbar = (message: string) => {
        setSnackbarText(message)
        setIsOpen(true)
    }

    const closeSnackbar = () => {
        setIsOpen(false)
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        (async () => {
            let token = await api.getPubSubAccessToken()
            setPubSubToken(token.token)
        })()
    }, [])

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            if (account) {
                instance.setActiveAccount(account)
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
            } else {
                console.error('No account is available.')
            }
        }
    }, [account, inProgress, instance, accountUsername, accountname])

    async function createUser(userEmail: string, name: string) {
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]
        const username = userEmail.split('@')[0]
        try {
            const createUserResponse = await api.addUser({
                azureAdUserId: userEmail,
                firstName: firstName,
                lastName: lastName ? lastName : firstName,
                username: username,
                email: userEmail,
            })
            console.log(
                'User creation response status:',
                createUserResponse.status
            )
            if (createUserResponse.status === 200) {
                await createUserResponse.json()
            } else {
                console.log(
                    'Error creating user:',
                    createUserResponse.statusText
                )
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

    if (accounts.length > 0) {
        return (
            <GlobalContext.Provider
                value={{
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    instance,
                    currentUser,
                    openSnackbar,
                    closeSnackbar,
                    snackbarText,
                    isOpen,
                    refreshList,
                    setRefreshList,
                    pubSubToken,
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
