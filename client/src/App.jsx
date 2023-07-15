import React from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import AddKaryawan from "./AddKaryawan";
import Karyawan from "./Karyawan";
import Absensi from "./Absensi";
import Start from "./Start";
import KaryawanMenu from "./KaryawanMenu";
import KaryawanLogin from "./KaryawanLogin";
import KaryawanEdit from "./KaryawanEdit";
import Izin from "./Izin";
import Report from "./Report";
import KeteranganIzin from "./KeteranganIzin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/karyawan" element={<Karyawan />}></Route>
          <Route path="/create" element={<AddKaryawan />}></Route>
          <Route path="/karyawanEdit/:id" element={<KaryawanEdit />}></Route>
          <Route path="/absensi" element={<Absensi />}></Route>
          <Route path="/izin" element={<Izin />}></Route>
          <Route path="/gaji" element={<Report />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/karyawanLogin" element={<KaryawanLogin />}></Route>
        <Route path="/karyawanMenu/:id" element={<KaryawanMenu />}>
          <Route path="/karyawanMenu/:id/keteranganizin/" element={<KeteranganIzin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
