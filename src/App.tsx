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

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <ApiContextProvider>
                    <AuthProvider>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<LandingPage />} />

                                <Route path="/Profile" element={<Profile />} />
                                <Route
                                    path="/ListUsers"
                                    element={<ListUsers />}
                                />
                                <Route path="/Adduser" element={<AddUser />} />
                            </Route>
                        </Routes>{' '}
                    </AuthProvider>
                </ApiContextProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
