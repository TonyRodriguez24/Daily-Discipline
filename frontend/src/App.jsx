import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar.jsx";
import Account from "./pages/Account.jsx";
import DailyLog from "./pages/DailyLog.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import Stats from "./pages/Stats.jsx";
import EditLog from "./pages/EditLog.jsx";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap');
      </style>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/daily-log/edit/:id" element={<EditLog />} />
        <Route path="/daily-log" element={<DailyLog />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;
