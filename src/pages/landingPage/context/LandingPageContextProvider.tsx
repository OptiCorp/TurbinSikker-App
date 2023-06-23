import { useAccount, useMsal } from '@azure/msal-react'
import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from '@azure/msal-browser'
import {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    useMemo,
} from 'react'
// create context

/////////

interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    idToken: string
    accessToken: string
    account: any
    accounts: any
    accountUsername: any
    accountname: any
    inProgress: InteractionStatus
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
    const [idToken, setIdToken] = useState('')
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ['user.read'],
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
                            .then(function (accessTokenResponse) {
                                // Acquire token interactive success
                                const accessToken =
                                    accessTokenResponse.accessToken
                                console.log('Accesstoken: ' + accessToken)
                            })
                            .catch(function (error) {
                                // Acquire token interactive failure
                                console.log(error)
                            })
                    }
                    console.log(error)
                })
        }
    }, [account, inProgress, accounts, instance, accountname, accountUsername])

    const memoedValue = useMemo(
        () => ({
            account,
            idToken,
            accessToken,
            accounts,
            accountUsername,
            accountname,
            inProgress,
            instance,
        }),
        [account, inProgress, idToken, accounts, instance]
    )

    if (accounts.length > 0) {
        return (
            <AuthContext.Provider value={memoedValue}>
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
