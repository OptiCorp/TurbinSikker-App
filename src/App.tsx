
import { Login } from './Pages/Login';
import './BasicStyling/App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import Layout from "./components/Layout";
import { useMsalAuthentication, useIsAuthenticated} from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';

const App = () =>  {
  const {error} = useMsalAuthentication(InteractionType.Redirect);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (error) {
        console.log(error)
    }
  });

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
