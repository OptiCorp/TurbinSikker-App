
import { Login } from './Pages/Login'
import './BasicStyling/App.css'
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';

import Layout from "./components/Layout";

const App = () =>  {

  return (
      <div className='wrapper'>
       
        	<Routes>
          <Route path="/" element={<Login />}/>
          <Route element={<Layout />}>
      
     
            <Route path= 'LandingPage' element={<LandingPage/>}/>
            </Route>
     </Routes>
  
     
      </div>
    
  )
}

export default App
