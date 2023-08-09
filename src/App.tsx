import { useIsAuthenticated } from "@azure/msal-react";
import { Route, Routes } from "react-router-dom";
import "./assets/App.css";
import { SnackbarComponent } from "./components/snackbar/SnackBar";
import { SnackbarContextProvider } from "./components/snackbar/SnackBarContext";
import Layout from "./pages/Layout";
import { IndexCheckLists } from "./pages/checklist";
import { CheckList } from "./pages/checklist/allchecklists/CheckList";
import { MyCheckLists } from "./pages/checklist/checkListID/MyCheckLists";
import { EditCheckList } from "./pages/checklist/editchecklist";
import { PreviewCheckList } from "./pages/checklist/previewCheckList/Preview";
import { SendCheckList } from "./pages/checklist/sendchecklist";
import { ApiContextProvider } from "./pages/context/apiContextProvider";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { AuthProvider } from "./pages/landingPage/context/LandingPageContextProvider";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { AddUser } from "./pages/users/addUser/AddUser";
import { ListUsers } from "./pages/users/listUsers/ListUsers";
const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="wrapper">
      {isAuthenticated && (
        <ApiContextProvider>
          <AuthProvider>
            <SnackbarContextProvider>
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
                    path="/EditCheckList/:id"
                    element={<EditCheckList />}
                  />
                  <Route path="/SendCheckList" element={<SendCheckList />} />
                  <Route
                    path="/SendCheckList/:id"
                    element={<SendCheckList />}
                  />

                  <Route path="/ListUsers" element={<ListUsers />} />
                  <Route path="/AddUser" element={<AddUser />} />
                  <Route path="/EditUser/:id" element={<AddUser />} />
                </Route>
              </Routes>

              <SnackbarComponent />
            </SnackbarContextProvider>{" "}
          </AuthProvider>
        </ApiContextProvider>
      )}
      {!isAuthenticated && <Login />}
    </div>
  );
};

export default App;
