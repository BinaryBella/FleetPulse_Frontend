import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation.jsx";
import ResetPassSuccess from "./pages/ResetPassSuccess.jsx";
import ResetEmail from "./pages/ResetEmail.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
export default function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/ResetPasswordConfirmation" element={<ResetPasswordConfirmation/>} />
          <Route path="/ResetPassSuccess" element={<ResetPassSuccess/>} />
          <Route path="/ResetEmail" element={<ResetEmail/>} />
          <Route path="/MainLayout" element={<MainLayout/>} />
      </Routes>
  )
}

