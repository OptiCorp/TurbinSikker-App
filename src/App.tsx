import { useIsAuthenticated } from "@azure/msal-react";
import { RoutesContainer } from "@components/RoutesContainer";
import "./assets/App.css";
import { SnackbarComponent } from "./components/snackbar/SnackBar";
import { SnackbarContextProvider } from "./components/snackbar/SnackBarContext";
import { ApiContextProvider } from "./pages/context/apiContextProvider";
import { AuthProvider } from "./pages/landingPage/context/LandingPageContextProvider";
import { Login } from "./pages/login";
const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="wrapper">
      {isAuthenticated && (
        <AuthProvider>
          <ApiContextProvider>
            <SnackbarContextProvider>
              <RoutesContainer />
              <SnackbarComponent />
            </SnackbarContextProvider>
          </ApiContextProvider>
        </AuthProvider>
      )}
      {!isAuthenticated && <Login />}
    </div>
  );
};

export default App;
