import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './404/NotFound.jsx';
import Home from "./Home/Home.jsx";
import FormularioRegistro from "./components/FormularioRegistro.jsx";
import Login from "./components/Login.jsx";
import RecoverPassword from "./components/RecoverPassword.jsx";
import Dashboard from "./Home/dashboard/Dashboard.jsx";
import FormularioRecPass from "./components/FormularioRecPass.jsx";
import Explore from "./Home/Explore.jsx";
import VerBlog from "./Home/ver-blogs/VerBlog.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<FormularioRegistro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Recoverypass" element={<RecoverPassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/RecPassI" element={<FormularioRecPass />} />
          <Route path="/blog/:id" element={<VerBlog />} /> {/* Ruta corregida para capturar el id del blog */}
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<NotFound />} /> {/* Ruta para manejar URLs no encontradas */}
        </Routes>
      </Router>
  );
}

export default App;
