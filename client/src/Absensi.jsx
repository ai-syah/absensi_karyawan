import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

function Absensi() {
  const [data, setData] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8083/getAbsensi")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (tanggal === "") {
      setFilteredData(data);
    } else {
      axios
        .get(`http://localhost:8083/absensi/filterByDate?tanggal=${tanggal}`)
        .then((res) => {
          if (Array.isArray(res.data.Result)) {
            setFilteredData(res.data.Result);
          } else if (typeof res.data.Result === "object") {
            setFilteredData([res.data.Result]);
          } else {
            setFilteredData([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [tanggal]);

  const handleDateChange = (event) => {
    setTanggal(event.target.value);
  };

  const formatDate = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h2> Data Absensi Karyawan</h2>
      </div>
      <div>
        <label htmlFor="date-select">Pilih tanggal:</label>
        <input type="date" id="date-select" value={tanggal} onChange={handleDateChange} />
      </div>
      <div className="mt-4 px-5 pt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Karyawan</th>
              <th>Masuk</th>
              <th>Keluar</th>
              <th>Tanggal</th>
              <th>Tunjangan</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((absensi, index) => {
              return (
                <tr key={index}>
                  <td>{absensi.nama_kar}</td>
                  <td>{absensi.masuk}</td>
                  <td>{absensi.keluar}</td>
                  <td>{formatDate(absensi.tanggal)}</td>
                  <td>{absensi.tunjangan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Absensi;
