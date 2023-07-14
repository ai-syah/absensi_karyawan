import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

function Izin() {
  const [data, setData] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8083/getIzin")
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
        .get(`http://localhost:8083/izin/filterByDate?tanggal=${tanggal}`)
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

  const downloadBukti = (bukti) => {
    const buktiUrl = `http://localhost:8083/images/${bukti}`;
    const link = document.createElement("a");
    link.href = buktiUrl;
    link.click();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h2>Data Izin Karyawan</h2>
      </div>
      <div>
        <label htmlFor="date-select">Pilih Tanggal:</label>
        <input type="date" id="date-select" value={tanggal} onChange={handleDateChange} />
      </div>

      <div className="mt-4 px-5 pt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Karyawan</th>
              <th>Jam</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Alasan</th>
              <th>Bukti</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((izin, index) => {
              return (
                <tr key={index}>
                  <td>{izin.nama_kar}</td>
                  <td>{izin.waktu}</td>
                  <td>{formatDate(izin.tanggal)}</td>
                  <td>{izin.keterangan}</td>
                  <td>{izin.alasan}</td>
                  <td>
                    <div className="image-container">
                      <img src={`http://localhost:8083/images/${izin.bukti}`} alt="" />
                      <button onClick={() => downloadBukti(izin.bukti)} className="btn btn-primary">
                        Download
                      </button>
                    </div>
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

export default Izin;
