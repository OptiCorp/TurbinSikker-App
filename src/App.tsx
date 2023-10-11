import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { RoutesContainer } from './RoutesContainer'
import './assets/App.css'
import { GlobalProvider } from './context/globalContextProvider'
import { Login } from './pages/login'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <GlobalProvider>
                    <RoutesContainer />
                    {/* <SnackbarComponent />  */}
                </GlobalProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
