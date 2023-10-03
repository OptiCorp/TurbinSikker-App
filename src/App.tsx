import { useIsAuthenticated } from '@azure/msal-react'
import './assets/App.css'
import { RoutesContainer } from './components/RoutesContainer'
import { SnackbarComponent } from './components/snackbar/SnackBar'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import { AuthContextType, AuthProvider } from './context/AuthContextProvider'
import { TurbinSikkerApiContextProvider } from './context/TurbinSikkerApiContext'
import { CheckListContextProvider } from './pages/context/CheckListContextProvider'
import { Login } from './pages/login'
import { UserContextProvider } from './pages/users/context/userContextProvider'
import { ApiService } from './services/api'
import { ApiStatus } from './services/apiTypes'

type AppProps = {

    api: ApiService
    auth: AuthContextType
    fetchChecklistStatus: ApiStatus



};


const App = () => { 
    const isAuthenticated = useIsAuthenticated()



    return (
        <div className="wrapper">
            {isAuthenticated && (
                <AuthProvider> 
                  <TurbinSikkerApiContextProvider>
                        <UserContextProvider>
                        <CheckListContextProvider>
                            <SnackbarContextProvider>
                                <RoutesContainer />
                                <SnackbarComponent />
                            </SnackbarContextProvider>
                            </CheckListContextProvider>
                        </UserContextProvider>
                        </TurbinSikkerApiContextProvider>
                </AuthProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
