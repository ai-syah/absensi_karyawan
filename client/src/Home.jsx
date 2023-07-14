import axios from "axios";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Home() {
  const [hitungKaryawan, setHitungKaryawan] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8083/hitungKaryawan")
      .then((res) => {
        setHitungKaryawan(res.data[0].karyawan);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 class="p-3 text-center t-3" f>
        <strong>Selamat Datang Admin</strong>
      </h1>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="container px-3 pt-2 pb-3 border shadow-sm w-50">
          <div className="row">
            <div className="col">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev",
                  center: "title",
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25 h-25">
          <div className="text-center pb-1">
            <h4>Karyawan</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {hitungKaryawan}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
