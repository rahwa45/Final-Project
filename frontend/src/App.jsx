import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/patient" element={<Patient />} />

        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
