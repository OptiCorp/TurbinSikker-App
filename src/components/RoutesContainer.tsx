import { Navigate, Route, Routes } from "react-router";
import Layout from "../pages/Layout";
import PageNotFound from "../pages/PageNotFound";
import { IndexCheckLists } from "../pages/checklist";
import { CheckList } from "../pages/checklist/allchecklists/CheckList";
import { MyCheckLists } from "../pages/checklist/checkListID/MyCheckLists";
import { EditCheckList } from "../pages/checklist/editchecklist/editCheckList";
import { PreviewCheckList } from "../pages/checklist/previewCheckList/Preview";
import { SendCheckList } from "../pages/checklist/sendchecklist";

import { EditCheckListContextProvider } from "../pages/checklist/editchecklist/context/editCheckListContextProvider";
import { FillOutCheckList } from "../pages/checklist/fillOutChecklist";
import { WorkflowContextProvider } from "../pages/checklist/workflow/context/workFlowContextProvider";
import { LandingPage } from "../pages/landingPage/LandingPage";
import { Profile } from "../pages/profile";
import Punch from "../pages/punch/Punch";
import { AddPunch } from "../pages/punch/addPunch/AddPunch";
import { AddUser } from "../pages/users/addUser/AddUser";
import { ListUsers } from "../pages/users/listUsers/ListUsers";
import { TaskCategoryContextProvider } from "./addtasks/context/addTaskCategoryContextProvider";

// const views = {
// separate pages
//   admin: AdminViews,
//   leader: LeaderView,
//   inspector: InspectorView,
// }

// interface Test {
//   user: {
//     permission: 'admin' | 'leader' | "inspector"
//   }
// }

// TODO: Try using (refactor the way permissions is setup) the views obj for checking if user has permission (https://www.youtube.com/shorts/XXI9BTWWOkE)

export function RoutesContainer(/* {user}: Test */) {
  /* const { currentUser } = useUserContext() */
  // const CurrentView = views[user.permission]

  // const {} = useAuth()

  // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //     if (currentUser?.userRole.name === 'Inspector') {
  //         return <Navigate to="/" replace />
  //     }
  //     return children
  // }
  return (
    <>
      <WorkflowContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />

            <Route path="/Profile" element={<Profile />} />

            <Route element={<IndexCheckLists />}>
              <Route path="/CheckList" element={<CheckList />} />
              <Route path="/MyChecklists" element={<MyCheckLists />} />
            </Route>
            <Route
              path="/PreviewCheckList/:id"
              element={<PreviewCheckList />}
            />

            <Route
              path="/FillOutCheckList/:id"
              element={<FillOutCheckList />}
            />

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
                // <ProtectedRoute>
                <AddUser />
                // </ProtectedRoute>
              }
            />
            {/*   <Route path="/AddUser" element={<AddUser />} /> */}
            <Route path="/punch" element={<Punch />} />
            <Route path="/AddPunch/" element={<AddPunch />} />
            <Route path="/EditPunch/:id" element={<AddPunch />} />
            <Route path="/EditUser/:id" element={<AddUser />} />
            <Route path="/User/:id" element={<AddUser />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
        </Routes>
      </WorkflowContextProvider>
    </>
  );
}
