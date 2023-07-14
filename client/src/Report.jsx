import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

function Report() {
  const [karyawanNama, setKaryawanNama] = useState("");
  const [karyawanData, setKaryawanData] = useState(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => alert("Print Success"),
  });

  const handleKaryawanChange = (event) => {
    setKaryawanNama(event.target.value);
  };

  const handleSearch = () => {
    if (karyawanNama) {
      axios
        .get(`http://localhost:8083/gaji/${karyawanNama}`)
        .then((response) => {
          setKaryawanData(response.data.karyawan);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
          <h1>Slip Gaji Karyawan</h1>
          <input type="text" value={karyawanNama} onChange={handleKaryawanChange} placeholder="Enter employee name" />
          <div className="d-flex justify-content-center m-3">
            {" "}
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {karyawanData && (
            <div>
              <div
                ref={componentRef}
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "210mm",
                  height: "150mm",
                }}
              >
                <div style={{ textAlign: "center", width: "100mm", height: "135mm", border: "1px solid #000", padding: "20px", borderRadius: "5px" }}>
                  <h2>Slip Gaji</h2>
                  <hr />
                  <img src={`http://localhost:8083/images/` + karyawanData.gambar} alt="" className="report_image" />
                  <p>
                    <strong>Nama:</strong> {karyawanData.nama}
                  </p>
                  <p>
                    <strong>Email:</strong> {karyawanData.email}
                  </p>
                  <p>
                    <strong>No.HP:</strong> {karyawanData.kontak}
                  </p>
                  <p>
                    <strong>Departemen:</strong> {karyawanData.departemen}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {karyawanData.alamat}
                  </p>
                  <p>
                    <strong>Gaji:</strong> {karyawanData.gapok}
                  </p>
                  <p>
                    <strong>Total Tunjangan:</strong> {karyawanData.total_tunjangan}
                  </p>
                  <p>
                    <strong>Total Gaji:</strong> {karyawanData.total_gaji}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
