import { useAccount, useMsal } from '@azure/msal-react'
import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from '@azure/msal-browser'
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    useMemo,
} from 'react'
// create context

export type ContextType = {
    apiData: string | undefined

    setApiData: React.Dispatch<React.SetStateAction<string | undefined>>
}

const LandingPageContext = createContext<ContextType | undefined>(undefined)

const LandingPageContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // the value that will be given to the context
    const [apiData, setApiData] = useState<string>()

    return (
        // the Provider gives access to the context to its children
        <LandingPageContext.Provider value={{ apiData, setApiData }}>
            {children}
        </LandingPageContext.Provider>
    )
}

function useLandingPageContext() {
    const context = useContext(LandingPageContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

/////////

interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    idToken: string
    accessToken: string
    account: any
    accounts: any
    apiData: string | undefined
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
    const [idToken, setIdToken] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const { apiData } = useLandingPageContext()
    useEffect(() => {
        if (!apiData && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ['user.read'],
                account: accounts[0],
            }

            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken)
                    setIdToken(tokenResponse.idToken)

                    /* Call your API with token
              callApi(accessToken).then((response) => {
                console.log(response)
                setApiData(response);
              });*/
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
                                /* Call your API with token

                    callApi(accessToken).then((response) => {
                      setApiData(response);
                    });
                    */
                            })
                            .catch(function (error) {
                                // Acquire token interactive failure
                                console.log(error)
                            })
                    }
                    console.log(error)
                })
        }
    }, [account, apiData, inProgress, accounts, instance])

    const memoedValue = useMemo(
        () => ({
            account,
            idToken,
            accessToken,
            accounts,
            apiData,
            inProgress,
            instance,
        }),
        [account, apiData, inProgress, accounts, instance]
    )

    if (accounts.length > 0) {
        return (
            <AuthContext.Provider value={memoedValue}>
                {children}
            </AuthContext.Provider>
        )

        {
            /* <span>
                    <h1>{account?.name}</h1>
                    There are currently {accounts.length} users signed in!
                </span>
                {apiData && (
                    <span>
                        Data retrieved from API: {JSON.stringify(apiData)}
                    </span>
                )}
            </>
        ) */
        }
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}

export default function useAuth() {
    return useContext(AuthContext)
}

export { useLandingPageContext, LandingPageContextProvider }
