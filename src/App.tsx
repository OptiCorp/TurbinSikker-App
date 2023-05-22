
import { Login } from './components/Login'
import './BasicStyling/App.css'
import { Routes, Route,  } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';


function App() {

  return (
      <div>
        	<Routes>
          <Route path="/" element={<Login />}/>
            <Route path= 'LandingPage' element={<LandingPage/>}/>
     </Routes>
     
      </div>
    
  )
}

export default App
