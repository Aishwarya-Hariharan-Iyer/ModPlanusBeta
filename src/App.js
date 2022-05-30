import './App.css';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import SignOut from './authentication/SignOut';
import Nav from './Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './homepage/Home';
import Planner from './module-planner/planner-main';
import Calculator from './cap-calculator/calculator';
function App() {

  const rootElement = document.getElementById("root");

    return (
      <Router>
      <div className='App'>
        <Nav/>
        <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signout' element={<SignOut/>}/>
        <Route path='/planner' element={<Planner/>}/>
        <Route path='/calculator' element={<Calculator/>}/>
      </Routes>
      </div>
      </Router>
    
    );
  }

export default App;