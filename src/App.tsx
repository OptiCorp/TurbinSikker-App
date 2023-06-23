import './assets/App.css'
import Layout from './pages/Layout'

import { Routes, Route } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'

import { LandingPage } from './pages/landingPage/LandingPage'
import { Login } from './pages/login'
import { Profile } from './pages/profile'
import { AddUser } from './pages/users/addUser/AddUser'
import { ApiContextProvider } from './pages/users/context/apiContextProvider'
import { AuthProvider } from './pages/landingPage/context/LandingPageContextProvider'
import { ListUsers } from './pages/users/listUsers/ListUsers'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import { SnackbarComponent } from './components/snackbar/SnackBar'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <ApiContextProvider>
                    <AuthProvider>
                        <SnackbarContextProvider>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<LandingPage />} />

                                    <Route
                                        path="/Profile"
                                        element={<Profile />}
                                    />
                                    <Route
                                        path="/ListUsers"
                                        element={<ListUsers />}
                                    />
                                    <Route
                                        path="/AddUser"
                                        element={<AddUser />}
                                    />
                                    <Route
                                        path="/EditUser/:id"
                                        element={<AddUser />}
                                    />
                                </Route>
                            </Routes>{' '}
                            <SnackbarComponent />
                        </SnackbarContextProvider>{' '}
                    </AuthProvider>
                </ApiContextProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
