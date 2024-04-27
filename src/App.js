import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar';



function App() {
  
  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (  //to wait until response from firebse comes if user is logged in or not. if user is 
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path='/'>                {/*Route Guarding  IF user is not logged in we donot let them see the home page we rather redirect them to login page */}
            {user && <Home/>}
            {!user && <Redirect to ='/login' />}
          </Route>
          <Route path='/login'>
            {user && <Redirect to ='/' />}
            {!user && <Login/>}
          </Route>
          <Route path='/signup'>
            {!user && <Signup/>}
            {user && <Redirect to='/' />}
          </Route>
        </Switch>
      </BrowserRouter>
)}
    </div>
  );
}

export default App
