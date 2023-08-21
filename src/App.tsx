import { useIsAuthenticated } from '@azure/msal-react'
import { Route, Routes } from 'react-router-dom'
import './assets/App.css'
import { TaskCategoryContextProvider } from './components/addtasks/context/addTaskCategoryContextProvider'
import { SnackbarComponent } from './components/snackbar/SnackBar'
import { SnackbarContextProvider } from './components/snackbar/SnackBarContext'
import Layout from './pages/Layout'
import { IndexCheckLists } from './pages/checklist'
import { CheckList } from './pages/checklist/allchecklists/CheckList'
import { MyCheckLists } from './pages/checklist/checkListID/MyCheckLists'
import { EditCheckList } from './pages/checklist/editchecklist/editCheckList'
import { PreviewCheckList } from './pages/checklist/previewCheckList/Preview'
import { SendCheckList } from './pages/checklist/sendchecklist'
import {
    CheckListContext,
    CheckListContextProvider,
} from './pages/context/CheckListContextProvider'
import { LandingPage } from './pages/landingPage/LandingPage'
import { AuthProvider } from './pages/landingPage/context/LandingPageContextProvider'
import { Login } from './pages/login'
import { Profile } from './pages/profile'
import { AddUser } from './pages/users/addUser/AddUser'
import {
    UserContextProvider,
    useUserContext,
} from './pages/users/context/userContextProvider'
import { ListUsers } from './pages/users/listUsers/ListUsers'
const App = () => {
    const isAuthenticated = useIsAuthenticated()
    const { currentUser } = useUserContext()
    return (
        <div className="wrapper">
            {isAuthenticated && (
                <AuthProvider>
                    <CheckListContextProvider>
                        <UserContextProvider>
                            <SnackbarContextProvider>
                                <Routes>
                                    <Route element={<Layout />}>
                                        <Route
                                            path="/"
                                            element={<LandingPage />}
                                        />

                                        <Route
                                            path="/Profile"
                                            element={<Profile />}
                                        />

                                        <Route element={<IndexCheckLists />}>
                                            <Route
                                                path="/CheckList"
                                                element={<CheckList />}
                                            />

                                            <Route
                                                path="/MyChecklists"
                                                element={<MyCheckLists />}
                                            />
                                        </Route>

                                        <Route
                                            path="/PreviewCheckList/:id"
                                            element={<PreviewCheckList />}
                                        />

                                        <Route
                                            path="/EditCheckList/:id"
                                            element={<EditCheckList />}
                                        />

                                        <Route
                                            path="/SendCheckList"
                                            element={<SendCheckList />}
                                        />
                                        <Route
                                            path="/SendCheckList/:id"
                                            element={<SendCheckList />}
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
                                </Routes>

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
