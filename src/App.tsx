import { useIsAuthenticated } from '@azure/msal-react'
import { RoutesContainer } from './RoutesContainer'
import './assets/App.css'
import { SnackbarComponent } from './components/snackbar/SnackBar'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import { GlobalProvider } from './context/globalContextProvider'

import { Login } from './pages/login'
import { UserContextProvider } from './pages/users/context/userContextProvider'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <GlobalProvider>
                    <UserContextProvider>
                        <SnackbarContextProvider>
                            <RoutesContainer />
                            <SnackbarComponent />
                        </SnackbarContextProvider>
                    </UserContextProvider>
                </GlobalProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
