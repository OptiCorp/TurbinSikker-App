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
import { API_URL } from '../config'
import { AzureUserInfo } from '../pages/users/context/models/AzureUserEntity'
import { User } from '../services/apiTypes'
export interface GlobalContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any

    currentUser: User | null

    instance: any
}
const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export function GlobalProvider({
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

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    console.log(currentUser)
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
        }
    }, [account, inProgress, accounts, instance, accountname, accountUsername])

    // azure fetch //

    async function createUser(userEmail: string, name: string) {
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
        try {
            const createUserResponse = await fetch(`${API_URL}/addUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    azureAdUserId: userEmail,
                    firstName: firstName,
                    lastName: lastName,
                    userName: username,
                    email: userEmail,
                    // other user properties
                }),
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
        const response = await fetch(
            `${API_URL}/GetUserByAzureAdUserId?azureAdUserId=${userEmail}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
        if (response.ok) {
            const user = await response.json()

            setCurrentUser(user)
        } else if (response.status === 404) {
            const newUser = await createUser(userEmail, name)

            if (newUser) {
                setCurrentUser(newUser)
            }
        } else {
            console.error('Error fetching user by email')
        }
    }

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

    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
        }
    }, [idToken])

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
