import { Navigate, Route, Routes } from 'react-router'
import Layout from './Layout'

import { IndexCheckLists } from './pages/checklist'
import { EditCheckList } from './pages/checklist/editchecklist/editCheckList'
import { ForReviewChecklists } from './pages/checklist/forReview/Index'
import { ChecklistComponent } from './pages/checklist/inprogressChecklists/Index'
import { MyCheckLists } from './pages/checklist/myChecklists/Index'
import { PreviewCheckList } from './pages/checklist/previewCheckList/Preview'
import { SendCheckList } from './pages/checklist/sendchecklist'
import { FillOutCheckList } from './pages/fillOutChecklist/Index'
import ListInvoices from './pages/invoice'
import PageNotFound from './pages/pageNotFound'
import { Profile } from './pages/profile'
import Punch from './pages/punch/Index'
import { AddPunch } from './pages/punch/addPunch/AddPunch'
import ListPunches from './pages/punch/listPunches/index'

import { useRoles } from './services/useRoles'

export function RoutesContainer() {
    const { isInspector, isLeader } = useRoles()

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/Profile" element={<Profile />} />

                <Route element={<IndexCheckLists />}>
                    <Route
                        path="/Checklists"
                        element={<ChecklistComponent />}
                    />
                    <Route
                        path="/ForReviewChecklists"
                        element={<ForReviewChecklists />}
                    />
                    <Route path="/MyChecklists" element={<MyCheckLists />} />

                    {isInspector && (
                        <Route path="/" element={<MyCheckLists />} />
                    )}

                    {isLeader && (
                        <Route path="/" element={<ChecklistComponent />} />
                    )}
                </Route>

                <Route
                    path="/PreviewCheckList/:id"
                    element={<PreviewCheckList />}
                />

                <Route
                    path="/FillOutChecklist/:workflowId"
                    element={<FillOutCheckList />}
                />
                <Route path="/EditCheckList/:id" element={<EditCheckList />} />
                <Route path="/SendCheckList" element={<SendCheckList />} />
                <Route path="/SendCheckList/:id" element={<SendCheckList />} />

                <Route path="/Punches" element={<ListPunches />} />
                <Route path="/workflow/:workflowId/punch" element={<Punch />} />
                <Route
                    path="/workflow/:workflowId/punch/:punchId"
                    element={<Punch />}
                />
                <Route
                    path="/workflow/:workflowId/EditPunch/:punchId/"
                    element={<AddPunch />}
                />
                <Route
                    path="/workflow/:workflowId/:taskId/AddPunch/"
                    element={<AddPunch />}
                />

                <Route
                    path="/invoice"
                    element={
                        isLeader ? (
                            <ListInvoices />
                        ) : (
                            <Navigate to="/MyChecklists" />
                        )
                    }
                />

                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Route>
        </Routes>
    )
}
