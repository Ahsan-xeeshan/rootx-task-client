import { Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import DashboardPage from "./pages/DashboardPage";
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route />
          <Route path="/" element={<HomePage />} exact>
          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>} />
           <Route path="/create-task" element={<CreateTaskPage />} />
          </Route>
         
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
       <ToastContainer />
    </>
  );
}
