import './BasicStyling/App.css';
import Layout from "./components/Layout";

import { Routes, Route } from 'react-router-dom';
import { useIsAuthenticated} from "@azure/msal-react";

import { LandingPage } from './Pages/LandingPage/LandingPage';
import { Login} from './Pages/Login';



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
