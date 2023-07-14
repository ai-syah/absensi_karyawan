import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Karyawan() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8083/getKaryawan")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8083/deletekaryawan/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/karyawan");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Karyawan List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Tambah Karyawan
      </Link>
      <div className="mt-4 px-5 pt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Email</th>
              <th>No.HP</th>
              <th>Departemen</th>
              <th>Alamat</th>
              <th>Gaji Pokok</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((karyawan, index) => {
              return (
                <tr key={index}>
                  <td>{karyawan.nama}</td>
                  <td>{<img src={`http://localhost:8083/images/` + karyawan.gambar} alt="" className="table_image" />}</td>
                  <td>{karyawan.email}</td>
                  <td>{karyawan.kontak}</td>
                  <td>{karyawan.departemen}</td>
                  <td>{karyawan.alamat}</td>
                  <td>{karyawan.gapok}</td>
                  <td>
                    <Link to={`/karyawanEdit/` + karyawan.id} className="btn btn-primary btn-sm me-2">
                      edit
                    </Link>
                    <button onClick={(e) => handleDelete(karyawan.id)} className="btn btn-sm btn-danger">
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Karyawan;
