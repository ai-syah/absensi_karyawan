import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function Profil() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/getAdmin/${id}`)
      .then((response) => response.data) // Menggunakan response.data untuk mendapatkan data JSON
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <h1>Selamat Datang {data.nama}!</h1>
        <img src={`http://localhost:8083/images/` + data.gambar} alt="" className="karImg" />
        <div className="d-flex align-items-center flex-column ">
          <h5>Nama: {data.nama}</h5>
          <h5>Email: {data.email}</h5>
        </div>
      </div>
    </div>
  );
}

export default Profil;
