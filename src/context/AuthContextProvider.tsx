import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import { Progress, Typography } from '@equinor/eds-core-react'
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import PageNotFound from '../pages/PageNotFound'
import apiService, { ApiService } from '../services/api'
import { ApiStatus } from '../services/apiTypes'

export interface AuthContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any
    accountUsername: any
    accountname: any
    inProgress: InteractionStatus
    fetchChecklistStatus?: ApiStatus
    api: ApiService
    instance: any
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
    children,
}: {
    children: ReactNode
}): JSX.Element {
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})
    const accountUsername = account?.username
    const accountname = account?.name
    const [idToken, setIdToken] = useState<string>('')
    const [accessToken, setAccessToken] = useState('')
    const [fetchChecklistStatus, setFetchChecklistStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )

    const api = apiService(accessToken)

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ['cc0af56e-ee49-46ce-aad6-010dce5bcbb6/User.Read'],
                account: accounts[0],
            }
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken)
                    setIdToken(tokenResponse.idToken)
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance
                            .acquireTokenPopup(accessTokenRequest)
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                    console.log(error)
                })
        }
    }, [account, inProgress, accounts, instance, accountname, accountUsername])

    useEffect(() => {
        ;(async (): Promise<void> => {
            setFetchChecklistStatus(ApiStatus.LOADING)
            try {
                setFetchChecklistStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setFetchChecklistStatus(ApiStatus.ERROR)
            }
        })()
    }, [api])

    if (fetchChecklistStatus === ApiStatus.LOADING) {
        return (
            <Progress.Circular>
                {' '}
                <Typography variant="h4" as="h2">
                    Loading
                </Typography>
            </Progress.Circular>
        )
    }
    if (fetchChecklistStatus === ApiStatus.ERROR) {
        return <PageNotFound />
    }

    if (accounts.length > 0) {
        return (
            <AuthContext.Provider
                value={{
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    accountUsername,
                    accountname,
                    inProgress,
                    instance,
                    api,
                    fetchChecklistStatus,
                }}
            >
                {children}
            </AuthContext.Provider>
        )
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}

export default function useAuth() {
    return useContext(AuthContext)
}
