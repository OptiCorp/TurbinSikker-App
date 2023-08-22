import { Navigate, Route, Routes } from 'react-router'
import Layout from '../pages/Layout'
import PageNotFound from '../pages/PageNotFound'
import { IndexCheckLists } from '../pages/checklist'
import { CheckList } from '../pages/checklist/allchecklists/CheckList'
import { MyCheckLists } from '../pages/checklist/checkListID/MyCheckLists'
import { EditCheckList } from '../pages/checklist/editchecklist/editCheckList'
import { PreviewCheckList } from '../pages/checklist/previewCheckList/Preview'
import { SendCheckList } from '../pages/checklist/sendchecklist'

import { Children } from 'react'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'
import { LandingPage } from '../pages/landingPage/LandingPage'
import useAuth from '../pages/landingPage/context/LandingPageContextProvider'
import { Profile } from '../pages/profile'
import { AddUser } from '../pages/users/addUser/AddUser'
import { useUserContext } from '../pages/users/context/userContextProvider'
import { ListUsers } from '../pages/users/listUsers/ListUsers'

export function RoutesContainer() {
    const { currentUser } = useUserContext()

    const {} = useAuth()

    const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        if (currentUser?.userRole.name === 'Inspector') {
            return <Navigate to="/" replace />
        }
        return children
    }
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/Profile" element={<Profile />} />

                    <Route element={<IndexCheckLists />}>
                        <Route path="/CheckList" element={<CheckList />} />
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
                    <Route path="/SendCheckList" element={<SendCheckList />} />
                    <Route
                        path="/SendCheckList/:id"
                        element={<SendCheckList />}
                    />

                    <Route path="/ListUsers" element={<ListUsers />} />
                    <Route
                        path="/add-user"
                        element={
                            <ProtectedRoute>
                                <AddUser />
                            </ProtectedRoute>
                        }
                    />
                    {/*   <Route path="/AddUser" element={<AddUser />} /> */}
                    <Route path="/EditUser/:id" element={<AddUser />} />
                    <Route path="/User/:id" element={<AddUser />} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Route>
            </Routes>
        </>
    )
}
