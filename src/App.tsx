import './assets/App.css'
import Layout from "./Pages/Layout";

import { Routes, Route } from 'react-router-dom';
import { useIsAuthenticated} from "@azure/msal-react";

import { LandingPage } from './Pages/landingPage/LandingPage';
import { Login} from './Pages/login';



const App = () =>  {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className='wrapper'>
        {isAuthenticated && (
          <Routes>
              <Route element={<Layout />} >
                  <Route path= '/' element={<LandingPage/>}/>
              </Route>
          </Routes>
        )}
        {!isAuthenticated && (
          <Login />
        )}
    </div>
  )
} 


export default App;
