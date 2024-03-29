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
import { ApiStatus, User } from '../services/apiTypes'
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
    const [pubSubToken, setPubSubToken] = useState<string>('')
    const [pubSubStatus, setPubSubStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
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

    async function fetchUserByAzureAdUserId(id: string) {
        const response = await api.getUserByAzureAdUserId(id)
        if (response) {
            const user = response

            setCurrentUser(user)
        } else {
            console.log('Error fetching user by Azure AD ID')
        }
    }

    const fetchUserAndUpdateContext = async (token: string) => {
        setStatus(ApiStatus.LOADING)
        try {
            const userInfo = getUserInfoFromIdToken(token)
            await fetchUserByAzureAdUserId(userInfo.oid)
            setStatus(ApiStatus.SUCCESS)
        } catch (error) {
            console.error('Error fetching and updating user:', error)
            setStatus(ApiStatus.ERROR)
        }
    }
    function getUserInfoFromIdToken(token: string): {
        preferredUserName: string
        name: string
        oid: string
    } {
        const decodedToken: AzureUserInfo = decode(token)

        return {
            preferredUserName: decodedToken?.preferred_username || '',
            oid: decodedToken?.oid,
            name: decodedToken.name || '',
        }
    }

    const fetchAndUpdatePubSubToken = async () => {
        setPubSubStatus(ApiStatus.LOADING)
        try {
            await fetchPubSubToken()
            setPubSubStatus(ApiStatus.SUCCESS)
        } catch (error) {
            console.log('Something went wrong: ' + error)
            setPubSubStatus(ApiStatus.ERROR)
        }
    }

    const fetchPubSubToken = async () => {
        const response = await api.getPubSubAccessToken()
        if (response) {
            setPubSubToken(response.token)
        }
    }

    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
        }
    }, [idToken])

    useEffect(() => {
        fetchAndUpdatePubSubToken()
    }, [])

    if (status === ApiStatus.LOADING) {
        return <Loading text="Loading .." />
    }

    if (status === ApiStatus.ERROR) {
        return <PageNotFound />
    }

    if (pubSubStatus === ApiStatus.ERROR) {
        return <PageNotFound />
    }

    if (pubSubStatus === ApiStatus.LOADING) {
        return <Loading text="Loading .." />
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
