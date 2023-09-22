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
import { CheckListContextProvider } from '../pages/context/CheckListContextProvider'
import { Profile } from '../pages/profile'
import Punch from '../pages/punch/Index'
import { AddPunch } from '../pages/punch/addPunch/AddPunch'
import { PunchContextProvider } from '../pages/punch/context/PunchContextProvider'
import ListPunches from '../pages/punch/listPunches/index'
import { AddUser } from '../pages/users/addUser/AddUser'
import { ListUsers } from '../pages/users/listUsers/ListUsers'
import { ProtectedRoute } from './ProtectedRoute'
import { TaskCategoryContextProvider } from './addtasks/context/addTaskCategoryContextProvider'

export function RoutesContainer() {
    return (
        <>
            <Routes>
                <Route
                    element={
                        <WorkflowContextProvider>
                            <Layout />
                        </WorkflowContextProvider>
                    }
                >
                    <Route path="/Profile" element={<Profile />} />

                    <Route
                        element={
                            <WorkflowContextProvider>
                                <IndexCheckLists />{' '}
                            </WorkflowContextProvider>
                        }
                    >
                        <Route
                            path="/"
                            element={
                                <CheckListContextProvider>
                                    <CheckList />
                                </CheckListContextProvider>
                            }
                        />
                        <Route
                            path="/CheckList"
                            element={
                                <WorkflowContextProvider>
                                    <CheckListContextProvider>
                                        <CheckList />
                                    </CheckListContextProvider>
                                </WorkflowContextProvider>
                            }
                        />
                        <Route
                            path="/CompletedCheckList"
                            element={<CompletedChecklists />}
                        />
                        <Route
                            path="/MyChecklists"
                            element={
                                <WorkflowContextProvider>
                                    <MyCheckLists />
                                </WorkflowContextProvider>
                            }
                        />
                    </Route>
                    <Route
                        path="/PreviewCheckList/:id"
                        element={<PreviewCheckList />}
                    />

                    <Route
                        path="/FillOutCheckList/:workflowId"
                        element={
                            <WorkflowContextProvider>
                                <FillOutCheckList />
                            </WorkflowContextProvider>
                        }
                    />
                    <Route
                        path="/EditCheckList/:id"
                        element={
                            <CheckListContextProvider>
                                <EditCheckListContextProvider>
                                    <TaskCategoryContextProvider>
                                        <EditCheckList />
                                    </TaskCategoryContextProvider>
                                </EditCheckListContextProvider>
                            </CheckListContextProvider>
                        }
                    />
                    <Route
                        path="/SendCheckList"
                        element={
                            <WorkflowContextProvider>
                                <SendCheckList />
                            </WorkflowContextProvider>
                        }
                    />
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
                        path="/workflow/:workflowId/punch"
                        element={
                            <WorkflowContextProvider>
                                <PunchContextProvider>
                                    <Punch />
                                </PunchContextProvider>
                            </WorkflowContextProvider>
                        }
                    />
                    <Route
                        path="/workflow/:workflowId/punch/:punchId"
                        element={
                            <WorkflowContextProvider>
                                <PunchContextProvider>
                                    <Punch />
                                </PunchContextProvider>
                            </WorkflowContextProvider>
                        }
                    />
                    <Route
                        path="/workflow/:workflowId/EditPunch/:punchId/"
                        element={
                            <WorkflowContextProvider>
                                <PunchContextProvider>
                                    <AddPunch />
                                </PunchContextProvider>
                            </WorkflowContextProvider>
                        }
                    />
                    <Route
                        path="/workflow/:workflowId/:taskId/AddPunch/"
                        element={
                            <WorkflowContextProvider>
                                <PunchContextProvider>
                                    <AddPunch />
                                </PunchContextProvider>
                            </WorkflowContextProvider>
                        }
                    />

                    <Route path="/EditUser/:id" element={<AddUser />} />
                    <Route path="/User/:id" element={<AddUser />} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Route>
            </Routes>
        </>
    )
}
