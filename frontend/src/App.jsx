import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Admin from './pages/Admin';
import Missing from './pages/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}


        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
        </Route>



        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
