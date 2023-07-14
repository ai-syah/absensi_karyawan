import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KaryawanLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8083/karyawanlogin", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          const id = res.data.id;
          navigate("/karyawanMenu/" + id);
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login Karyawan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter Email" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} className="form-control rounded-0" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter Password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            {" "}
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default KaryawanLogin;
