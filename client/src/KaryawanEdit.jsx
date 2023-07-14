import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KaryawanEdit() {
  const [data, setData] = useState({
    nama: "",
    email: "",
    gapok: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8083/getKaryawan/" + id)
      .then((res) => {
        setData({ ...data, nama: res.data.Result[0].nama, email: res.data.Result[0].email, gapok: res.data.Result[0].gapok });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8083/updatekaryawan/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/karyawan");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Karyawan</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">
            Nama
          </label>
          <input type="text" class="form-control" id="inputName" autoComplete="off" onChange={(e) => setData({ ...data, nama: e.target.value })} value={data.nama} />
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input type="email" class="form-control" id="inputEmail4" autoComplete="off" onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} />
        </div>
        <div class="col-12">
          <label for="inputSalary" class="form-label">
            Salary
          </label>
          <input type="text" class="form-control" id="inputSalary" autoComplete="off" onChange={(e) => setData({ ...data, gapok: e.target.value })} value={data.gapok} />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default KaryawanEdit;
