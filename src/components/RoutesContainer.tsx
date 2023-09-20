import { Navigate, Route, Routes } from 'react-router'
import Layout from '../pages/Layout'
import PageNotFound from '../pages/PageNotFound'
import { IndexCheckLists } from '../pages/checklist'
import { CheckList } from '../pages/checklist/allchecklists/Index'
import { MyCheckLists } from '../pages/checklist/checkListID/Index'
import { CompletedChecklists } from '../pages/checklist/completedChecklists/Index'
import { EditCheckListContextProvider } from '../pages/checklist/editchecklist/context/editCheckListContextProvider'
import { EditCheckList } from '../pages/checklist/editchecklist/editCheckList'
import { FillOutCheckList } from '../pages/checklist/fillOutChecklist'
import { PreviewCheckList } from '../pages/checklist/previewCheckList/Preview'
import { SendCheckList } from '../pages/checklist/sendchecklist'
import { WorkflowContextProvider } from '../pages/checklist/workflow/context/workFlowContextProvider'
import { Profile } from '../pages/profile'
import Punch from '../pages/punch/Punch'
import { AddPunch } from '../pages/punch/addPunch/AddPunch'
import { PunchContextProvider } from '../pages/punch/context/PunchContextProvider'
import ListPunches from '../pages/punch/listPunches/index'
import { AddUser } from '../pages/users/addUser/AddUser'
import { ListUsers } from '../pages/users/listUsers/ListUsers'
import { ProtectedRoute } from './ProtectedRoute'
import { TaskCategoryContextProvider } from './addtasks/context/addTaskCategoryContextProvider'
import { CheckListContextProvider } from '../pages/context/CheckListContextProvider'

export function RoutesContainer() {
    return (
        <>
            <WorkflowContextProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/Profile" element={<Profile />} />

                        <Route element={<IndexCheckLists />}>
                            <Route path="/" element={<CheckList />} />
                            <Route path="/CheckList" element={<CheckList />} />
                            <Route path="/CompletedCheckList" element={<CompletedChecklists />} />
                            <Route path="/MyChecklists" element={<MyCheckLists />} />
                        </Route>
                        <Route path="/PreviewCheckList/:id" element={<PreviewCheckList />} />

                        <Route path="/FillOutCheckList/:id" element={<FillOutCheckList />} />

                        <Route
                            path="/EditCheckList/:id"
                            element={
                                <EditCheckListContextProvider>
                                    <TaskCategoryContextProvider>
                                        <EditCheckList />
                                    </TaskCategoryContextProvider>
                                </EditCheckListContextProvider>
                            }
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

                        <Route
                            path="/ListPunches"
                            element={
                                <PunchContextProvider>
                                    <ListPunches />
                                </PunchContextProvider>
                            }
                        />
                        <Route
                            path="/punch"
                            element={
                                <PunchContextProvider>
                                    <Punch />
                                </PunchContextProvider>
                            }
                        />
                        <Route
                            path="/punch/:id"
                            element={
                                <PunchContextProvider>
                                    <Punch />
                                </PunchContextProvider>
                            }
                        />
                        <Route
                            path="/EditPunch/:id/"
                            element={
                                <CheckListContextProvider>
                                    <PunchContextProvider>
                                        <AddPunch />
                                    </PunchContextProvider>
                                </CheckListContextProvider>
                            }
                        />
                        <Route path="/AddPunch/" element={<AddPunch />} />
                        {/* <Route path="/EditPunch/:id" element={<AddPunch />} /> */}
                        <Route path="/EditUser/:id" element={<AddUser />} />
                        <Route path="/User/:id" element={<AddUser />} />
                        <Route path="/404" element={<PageNotFound />} />
                        <Route path="*" element={<Navigate to="404" />} />
                    </Route>
                </Routes>
            </WorkflowContextProvider>
        </>
    )
}
