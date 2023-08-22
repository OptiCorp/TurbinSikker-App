import { useIsAuthenticated } from '@azure/msal-react'
import './assets/App.css'
import { RoutesContainer } from './components/RoutesContainer'
import { SnackbarComponent } from './components/snackbar/SnackBar'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import { CheckListContextProvider } from './pages/context/CheckListContextProvider'
import { AuthProvider } from './pages/landingPage/context/LandingPageContextProvider'
import { Login } from './pages/login'
import { UserContextProvider } from './pages/users/context/userContextProvider'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <AuthProvider>
                    <CheckListContextProvider>
                        <UserContextProvider>
                            <SnackbarContextProvider>
                                <RoutesContainer />
                                <SnackbarComponent />
                            </SnackbarContextProvider>
                        </UserContextProvider>
                    </CheckListContextProvider>
                </AuthProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
