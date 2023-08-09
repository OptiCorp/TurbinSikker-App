import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import decode from 'jwt-decode'
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
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
    const [userEmail, setUserEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ['user.read', 'email'],
                account: accounts[0],
            }

            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken)
                    setIdToken(tokenResponse.idToken)
                    const decodedIdToken = decode(tokenResponse.idToken) as {
                        preferred_username?: string
                        email?: string
                        upn?: string
                        name?: string
                    }
                    const firstNameFromToken =
                        decodedIdToken.name?.split(' ')[0] || ''
                    const lastNameFromToken =
                        decodedIdToken.name?.split(' ')[1] || ''
                    console.log(lastNameFromToken)
                    setUserEmail(decodedIdToken.preferred_username || '')
                    setFirstName(firstNameFromToken)
                    setLastName(lastNameFromToken)
                    console.log('decodedIdToken: ', decodedIdToken)
                    console.log('userEmail: ', userEmail)
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
    useEffect(() => {
        async function getAzureAdUser() {
            if (userEmail) {
                try {
                    const response = await fetch(
                        `http://20.251.37.226:8080/api/GetUserByAzureAdUserId?azureAdUserId=${userEmail}`
                    )
                    if (response.status === 404) {
                        console.log('Azure AD user not found. Creating user...')
                        await createUser()
                    } else {
                        const result = await response.json()
                        console.log('Fetched Azure AD user:', result)
                    }
                } catch (error) {
                    console.log('Error fetching Azure AD user:', error)
                }
            }
        }
        async function createUser() {
            if (userEmail) {
                try {
                    console.log('userEmail here: ', userEmail)
                    const createUserResponse = await fetch(
                        'http://20.251.37.226:8080/api/AddUser',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                azureAdUserId: userEmail,
                                Email: userEmail,
                                FirstName: firstName,
                                LastName: lastName,
                                UserName: `${firstName.replaceAll(
                                    'ø',
                                    'o'
                                )}.${lastName}`,
                                // other user properties
                            }),
                        }
                    )
                    if (createUserResponse.status === 200) {
                        console.log(
                            'User created successfully:',
                            await createUserResponse.json()
                        )
                    } else {
                        console.log(
                            'Error creating user:',
                            createUserResponse.statusText
                        )
                    }
                } catch (error) {
                    console.log('Error creating user:', error)
                }
            }
        }
        if (userEmail) {
            getAzureAdUser()
        }
    }, [userEmail])

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
    console.log('accessToken: ', accessToken)
    console.log('idToken: ', idToken)

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
