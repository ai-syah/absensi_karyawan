import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddKaryawan() {
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",

    departemen: "",
    kontak: "",
    alamat: "",
    gapok: "",
    gambar: null,
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("nama", data.nama);
    formdata.append("email", data.email);
    formdata.append("password", data.password);

    formdata.append("kontak", data.kontak);
    formdata.append("departemen", data.departemen);
    formdata.append("alamat", data.alamat);
    formdata.append("gapok", data.gapok);
    formdata.append("gambar", data.gambar);

    axios
      .post("http://localhost:8083/addkaryawan", formdata)
      .then((res) => {
        console.log(res);
        navigate("/karyawan");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Tambah Karyawan</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">
            Nama:
          </label>
          <input type="text" class="form-control" autoComplete="off" onChange={(e) => setData({ ...data, nama: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input type="email" class="form-control" autoComplete="off" onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputPassword4" class="form-label">
            Password:
          </label>
          <input type="password" class="form-control" onChange={(e) => setData({ ...data, password: e.target.value })} />
        </div>
        <div class="col-12">
          <input type="text" class="form-control" onChange={(e) => setData({ ...data, role: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputPassword4" class="form-label">
            No.HP
          </label>
          <input type="text" class="form-control" onChange={(e) => setData({ ...data, kontak: e.target.value })} />
        </div>
        <div class="col-12 ">
          <label for="inputDepartment" class="form-label">
            Departemen:
          </label>
          <input type="text" class="form-control" autoComplete="off" onChange={(e) => setData({ ...data, departemen: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputSalary" class="form-label">
            Gaji Pokok:
          </label>
          <input type="text" class="form-control" autoComplete="off" onChange={(e) => setData({ ...data, gapok: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Alamat:
          </label>
          <input type="text" class="form-control" autoComplete="off" onChange={(e) => setData({ ...data, alamat: e.target.value })} />
        </div>
        <div class="col-12 mb-3">
          <label class="form-label" for="inputGroupFile01">
            Pilih Foto:
          </label>
          <input type="file" class="form-control" onChange={(e) => setData({ ...data, gambar: e.target.files[0] })} />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Input
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddKaryawan;
