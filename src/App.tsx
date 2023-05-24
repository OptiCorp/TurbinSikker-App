
import { Login} from './Pages/Login';
import './BasicStyling/App.css';

import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import Layout from "./components/Layout";
import { useIsAuthenticated} from "@azure/msal-react";





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
                 <>
                          
                       
            
        
                     <Login />
                 
     
        
             
               </>
            )}
    </div>
  )
} 


export default App;
