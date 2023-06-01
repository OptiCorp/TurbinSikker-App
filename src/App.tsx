import './assets/App.css'
import Layout from './pages/Layout'

import { Routes, Route } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'

import { LandingPage } from './pages/landingPage/LandingPage'
import { Login } from './pages/login'
import { Profile } from './pages/profile'
import { AddUser } from './pages/users/AddUser'

const App = () => {
    const isAuthenticated = useIsAuthenticated()

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/Adduser" element={<AddUser />} />
                    </Route>
                </Routes>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
