import { useIsAuthenticated } from '@azure/msal-react'
import { RoutesContainer } from './RoutesContainer'
import { GlobalProvider } from './context/globalContextProvider'
import { Login } from './pages/login'
import './style/App.css'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <GlobalProvider>
                    <RoutesContainer />
                </GlobalProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
