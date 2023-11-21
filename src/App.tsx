import { useIsAuthenticated } from '@azure/msal-react'
import { RoutesContainer } from './RoutesContainer'

import { SnackBarComponent } from './components/snackbar/Snackbar'
import { GlobalProvider } from './context/globalContextProvider'
import { Login } from './pages/login'


const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <>
            <div className="wrapper">
                {isAuthenticated && (
                    <GlobalProvider>
                        <SnackBarComponent />
                        <RoutesContainer />
                    </GlobalProvider>
                )}
                {!isAuthenticated && <Login />}
            </div>
        </>
    )
}

export default App
