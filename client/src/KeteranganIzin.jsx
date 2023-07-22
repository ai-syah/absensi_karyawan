import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./style.css";

function KeteranganIzin() {
  const { id } = useParams();
  const [alasanIzin, setAlasanIzin] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const formatTanggal = format(tanggal, "yyyy-MM-dd");
  const [waktu, setWaktu] = useState("");
  const [submitIzin, setSubmitIzin] = useState(false);
  const [bukti, setBukti] = useState(null);

  const handleSubmitIzin = (e) => {
    e.preventDefault();
    const jamSekarang = new Date().toLocaleTimeString();
    setWaktu(jamSekarang);
    const formData = new FormData();
    formData.append("bukti", bukti);
    formData.append("karyawanId", id);
    formData.append("alasan", alasanIzin);
    formData.append("tanggal", formatTanggal);
    formData.append("waktu", jamSekarang);
    formData.append("keterangan", keterangan);

    axios
      .post("http://localhost:8083/izin", formData)
      .then((res) => {
        console.log("Absen Izin");
        setSubmitIzin(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <h1>Keterangan Izin</h1>
        <div className="">
          <form className="d-flex flex-column align-items-center pt-4 row g-3 w-100" onSubmit={handleSubmitIzin} enctype="multipart/form-data">
            <div className="col-12 mb-3">
              <label htmlFor="keterangan" className="form-label text-center">
                Keterangan:
              </label>
              <input type="text" className="form-control" id="keterangan" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="alasanIzin" className="form-label text-center">
                Alasan:
              </label>
              <input type="text" className="form-control" id="alasanIzin" value={alasanIzin} onChange={(e) => setAlasanIzin(e.target.value)} />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label text-center">Jam : </label>
              <input type="time" value={waktu} onChange={(e) => setWaktu(e.target.value)} readOnly disabled className="input-border" />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label text-center">Tanggal : </label>
              <DatePicker selected={tanggal} onChange={(date) => setTanggal(date)} readOnly disabled className="input-border" />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label text-center" htmlFor="inputGroupFile01">
                Pilih File:
              </label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => setBukti(e.target.files[0])} />
            </div>
            {submitIzin ? (
              <p>Keterangan izin sudah di submit</p>
            ) : (
              <button className="ms-4 btn btn-primary btn-lg btn-block" type="submit">
                Input
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default KeteranganIzin;
