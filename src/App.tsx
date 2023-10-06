import { useIsAuthenticated } from '@azure/msal-react'
import './assets/App.css'
import { RoutesContainer } from './components/RoutesContainer'
import { SnackbarComponent } from './components/snackbar/SnackBar'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import { GlobalProvider } from './context/globalContextProvider'
import { CheckListContextProvider } from './pages/context/CheckListContextProvider'
import { Login } from './pages/login'
import { UserContextProvider } from './pages/users/context/userContextProvider'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <GlobalProvider>
                    <UserContextProvider>
                        <CheckListContextProvider>
                            <SnackbarContextProvider>
                                <RoutesContainer />
                                <SnackbarComponent />
                            </SnackbarContextProvider>
                        </CheckListContextProvider>
                    </UserContextProvider>
                </GlobalProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
