import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

function KaryawanMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [karyawan, setKaryawan] = useState([]);
  const [masuk, setMasuk] = useState("");
  const [keluar, setKeluar] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const formatTanggal = format(tanggal, "yyyy-MM-dd");
  const [klikMasuk, setKlikMasuk] = useState(false);
  const [klikKeluar, setKlikKeluar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8083/getKaryawan/" + id)
      .then((res) => setKaryawan(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitMasuk = (e) => {
    e.preventDefault();
    const jamSekarang = new Date().toLocaleTimeString();
    setMasuk(jamSekarang);

    axios
      .post("http://localhost:8083/absensi/masuk", {
        karyawanId: karyawan.id,
        masuk: jamSekarang,
        tanggal: formatTanggal,
      })
      .then((res) => {
        console.log("Absen Masuk");
        setKlikMasuk(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmitKeluar = (e) => {
    e.preventDefault();
    const jamSekarang = new Date().toLocaleTimeString();
    setKeluar(jamSekarang);

    axios
      .post("http://localhost:8083/absensi/keluar", {
        karyawanId: karyawan.id,
        keluar: jamSekarang,
        tanggal: formatTanggal,
      })
      .then((res) => {
        console.log("Absen Keluar");
        setKlikKeluar(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8083/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <h1>Selamat Datang {karyawan.nama}!</h1>
        <img src={`http://localhost:8083/images/` + karyawan.gambar} alt="" className="karImg" />
        <div className="d-flex flex-column ">
          <h5>Nama : {karyawan.nama}</h5>
          <h5>Email : {karyawan.email}</h5>
        </div>
        <>
          <h1>Silahkan isi absensi anda</h1>
          <form className="m-1" onSubmit={handleSubmitMasuk}>
            <label className="form-label text-center">Jam Masuk :</label>
            <input type="time" value={masuk} onChange={(e) => setMasuk(e.target.value)} readOnly disabled={klikMasuk} className="input-border" />
            <label className="form-label text-center">Tanggal Masuk :</label>
            <DatePicker selected={tanggal} onChange={(tanggal) => setTanggal(tanggal)} readOnly disabled={klikMasuk} className="input-border" />
            {klikMasuk ? (
              <p>Anda sudah absen masuk!</p>
            ) : (
              <button className="ms-4 btn btn-primary " type="submit">
                Masuk
              </button>
            )}
          </form>
          <form className="m-1" onSubmit={handleSubmitKeluar}>
            <label className="form-label text-center">Jam Keluar :</label>
            <input type="time" value={keluar} onChange={(e) => setKeluar(e.target.value)} readOnly disabled={klikKeluar} className="input-border" />
            <label>Tanggal Masuk :</label>
            <DatePicker selected={tanggal} onChange={(tanggal) => setTanggal(tanggal)} readOnly disabled={klikKeluar} className="input-border" />
            {klikKeluar ? (
              <p>Anda sudah absen keluar!</p>
            ) : (
              <button className="ms-4 btn btn-primary " type="submit">
                Keluar
              </button>
            )}
          </form>
        </>
        <button onClick={(e) => navigate("/keteranganizin")} className="btn btn-primary btn-lg mt-3">
          Keterangan Izin
        </button>
        <Outlet />
        <div>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default KaryawanMenu;
