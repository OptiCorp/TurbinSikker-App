import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { RoutesContainer } from './RoutesContainer'
import './assets/App.css'

import { GlobalProvider } from './context/globalContextProvider'

import { Login } from './pages/login'
import { UserContextProvider } from './pages/users/context/userContextProvider'

const App = () => {
    const isAuthenticated = useIsAuthenticated()
    const { inProgress } = useMsal()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <GlobalProvider>
                    <UserContextProvider>
                        <RoutesContainer />
                    </UserContextProvider>
                </GlobalProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
