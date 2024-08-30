//Routes-This component is a container for all the Route components. It helps in managing the routing logic and rendering the appropriate component based on the current URL.
//Route-This component defines a single route. It specifies a path (URL) and the component that should be rendered when the user navigates to that path.

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
function App() {
  return (
    <Router>       
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
