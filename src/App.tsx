
import { Login } from './Pages/Login';
import './BasicStyling/App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import Layout from "./components/Layout";
import { useMsalAuthentication, useIsAuthenticated, useMsal} from "@azure/msal-react";

const App = () =>  {
  const {login, result, error} = useMsalAuthentication("redirect");
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (error) {
        console.log(error)
    }
  });

  const { accounts } = useMsal();

  return (
    <div className='wrapper'>
            {isAuthenticated && (
              <Routes>
              <Route path="/" element={<Login />}/>
              <Route element={<Layout />} >
                  <Route path= 'LandingPage' element={<LandingPage/>}/>
              </Route>
            </Routes>
            )}
            {!isAuthenticated && (
                <p>No users are signed in!</p>
            )}
    </div>
  )
}

export default App
