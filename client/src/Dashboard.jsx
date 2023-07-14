import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8083/dashboard").then((res) => {
      if (res.data.Status === "Success") {
        if (res.data.role === "admin") {
          navigate("/");
        } else {
          navigate("/start");
        }
      } else {
        navigate("/start");
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8083/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li>
                <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/karyawan" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Data Karyawan</span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/absensi" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi bi-calendar3"></i> <span className="ms-1 d-none d-sm-inline">Data Absensi</span>
                </Link>
              </li>
              <li>
                <Link to="/izin" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi bi-calendar-week"></i> <span className="ms-1 d-none d-sm-inline">Data Keterangan Izin</span>
                </Link>
              </li>
              <li>
                <Link to="/gaji" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-filter-square"></i> <span className="ms-1 d-none d-sm-inline">Laporan Gaji</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a href="#" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Sistem Absensi Karyawan</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
