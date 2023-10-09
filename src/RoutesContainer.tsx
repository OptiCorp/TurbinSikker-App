import { Navigate, Route, Routes } from 'react-router'
import Layout from './Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GlobalProvider } from './context/globalContextProvider'
import PageNotFound from './pages/PageNotFound'
import { IndexCheckLists } from './pages/checklist'
import { CheckList } from './pages/checklist/allchecklists/Index'
import { CompletedChecklists } from './pages/checklist/completedChecklists/Index'
import { EditCheckList } from './pages/checklist/editchecklist/editCheckList'
import { MyCheckLists } from './pages/checklist/myChecklists/Index'
import { PreviewCheckList } from './pages/checklist/previewCheckList/Preview'
import { SendCheckList } from './pages/checklist/sendchecklist'
import { Profile } from './pages/profile'
import Punch from './pages/punch/Index'
import { AddPunch } from './pages/punch/addPunch/AddPunch'
import { PunchContextProvider } from './pages/punch/context/PunchContextProvider'
import ListPunches from './pages/punch/listPunches/index'
import { AddUser } from './pages/users/addUser/AddUser'
import { ListUsers } from './pages/users/listUsers/ListUsers'
import { FillOutCheckList } from './pages/workflowAddPunch'

export function RoutesContainer() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/Profile" element={<Profile />} />

                    <Route
                        element={
                            <GlobalProvider>
                                <IndexCheckLists />
                            </GlobalProvider>
                        }
                    >
                        <Route
                            path="/"
                            element={
                                <GlobalProvider>
                                    <CheckList />
                                </GlobalProvider>
                            }
                        />
                        <Route
                            path="/Checklist"
                            element={
                                <GlobalProvider>
                                    <CheckList />
                                </GlobalProvider>
                            }
                        />
                        <Route path="/CompletedChecklist" element={<CompletedChecklists />} />
                        <Route
                            path="/MyChecklists"
                            element={
                                <GlobalProvider>
                                    <MyCheckLists />
                                </GlobalProvider>
                            }
                        />
                    </Route>
                    <Route path="/PreviewCheckList/:id" element={<PreviewCheckList />} />

                    <Route path="/FillOutChecklist/:workflowId" element={<FillOutCheckList />} />
                    <Route
                        path="/EditCheckList/:id"
                        element={<EditCheckList />}
                    />
                    <Route path="/SendCheckList" element={<SendCheckList />} />
                    <Route path="/SendCheckList/:id" element={<SendCheckList />} />

                    <Route path="/ListUsers" element={<ListUsers />} />
                    <Route
                        path="/add-user"
                        element={
                            <ProtectedRoute>
                                <AddUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/AddUser" element={<AddUser />} />

                    <Route path="/Punches" element={<ListPunches />} />
                    <Route path="/workflow/:workflowId/punch" element={<Punch />} />
                    <Route path="/workflow/:workflowId/punch/:punchId" element={<Punch />} />
                    <Route
                        path="/workflow/:workflowId/EditPunch/:punchId/"
                        element={<AddPunch />}
                    />
                    <Route path="/workflow/:workflowId/:taskId/AddPunch/" element={<AddPunch />} />

                    <Route path="/EditUser/:id" element={<AddUser />} />
                    <Route path="/User/:id" element={<AddUser />} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Route>
            </Routes>
        </>
    )
}
