import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "absensi_karyawan",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.get("/getKaryawan", (req, res) => {
  const sql = "SELECT * FROM karyawan";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get karyawan error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.get("/getAdmin", (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get admin error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getAbsensi", (req, res) => {
  const sql = "SELECT * FROM absensi";

  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get attendance error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getIzin", (req, res) => {
  const sql = "SELECT * FROM izin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get absence error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/izin/filterByDate", (req, res) => {
  const tanggal = req.query.tanggal;
  const sql = "SELECT * FROM izin WHERE tanggal = ?";
  con.query(sql, [tanggal], (err, result) => {
    if (err) return res.json({ Error: "Get absence error in SQL" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/absensi/filterByDate", (req, res) => {
  const tanggal = req.query.tanggal;
  const sql = "SELECT * FROM absensi WHERE tanggal = ?";
  con.query(sql, [tanggal], (err, result) => {
    if (err) return res.json({ Error: "Get attendance error in SQL" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getKaryawan/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM karyawan where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get karyawan error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});
app.get("/profile", (req, res) => {
  res.json(user);
});

app.get("/getAdmin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get user error in SQL" });
    if (result.length === 0) return res.json({ Error: "User not found" });
    return res.json({ Status: "Success", Result: result[0] });
  });
});

app.put("/updatekaryawan/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE karyawan set gapok = ? WHERE id = ?";
  con.query(sql, [req.body.gapok, id], (err, result) => {
    if (err) return res.json({ Error: "update karyawan error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.delete("/deletekaryawan/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM karyawan WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete karyawan error in sql" });
    return res.json({ Status: "Success" });
  });
});
app.delete("/deleteadmin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM users WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete karyawan error in sql" });
    return res.json({ Status: "Success" });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token Salah" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/hitungKaryawan", (req, res) => {
  const sql = "Select count(id) as karyawan from karyawan";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where email = ? ";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      if (req.body.password === result[0].password) {
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token);
        return res.json({ Status: "Success", id: result[0].id });
      } else {
        return res.json({ Status: "Error", Error: "Email atau Password Salah" });
      }
    } else {
      return res.json({ Status: "Error", Error: "Email atau Password Salah" });
    }
  });
});

app.post("/karyawanlogin", (req, res) => {
  const sql = "SELECT * FROM karyawan WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      if (req.body.password === result[0].password) {
        const token = jwt.sign({ role: "karyawan" }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token);
        return res.json({ Status: "Success", id: result[0].id });
      } else {
        return res.json({ Status: "Error", Error: "Email atau Password Salah" });
      }
    } else {
      return res.json({ Status: "Error", Error: "Email atau Password Salah" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/addkaryawan", upload.single("gambar"), (req, res) => {
  const sql = "INSERT INTO karyawan (`nama`, `email`, `password`, `kontak`, `departemen`, `alamat`, `gapok`, `gambar`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [req.body.nama, req.body.email, req.body.password, req.body.kontak, req.body.departemen, req.body.alamat, req.body.gapok, req.file.filename];
  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json({ Status: "Success" });
  });
});

app.post("/addadmin", upload.single("gambar"), (req, res) => {
  const sql = "INSERT INTO users (`nama`, `email`, `password`,`kontak`, `gambar`) VALUES (?, ?, ?, ?, ?)";
  const values = [req.body.nama, req.body.email, req.body.password, req.body.kontak, req.file.filename];
  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Inside absensi_karyawan query" });
    return res.json({ Status: "Success" });
  });
});

app.post("/absensi/masuk", (req, res) => {
  const { karyawanId, masuk, keluar, tanggal } = req.body;
  const tunjangan = calculateTunjangan(masuk, keluar);
  const absensi = {
    id_kar: karyawanId,
    masuk: masuk,
    keluar: keluar,
    tanggal: tanggal,
    tunjangan: tunjangan,
  };

  con.query("INSERT INTO absensi SET ?", absensi, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Absen masuk");

    con.query("UPDATE absensi SET tunjangan = ? WHERE id_kar = ? AND tanggal = ?", [tunjangan, karyawanId, tanggal], (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Hitung tunjangan");

      con.query("UPDATE absensi a JOIN karyawan k ON a.id_kar = k.id SET a.nama_kar = k.nama", (err, results) => {
        if (err) {
          throw err;
        } else {
          console.log("table absensi diupdate");
        }
      });

      res.sendStatus(200);
    });
  });
});

function calculateTunjangan(masuk, keluar) {
  const jamMasuk = new Date(masuk).getHours();
  const jamKeluar = new Date(keluar).getHours();
  const selisihJam = jamKeluar - jamMasuk;

  if (selisihJam >= 2) {
    return 50000;
  } else if (selisihJam > 0) {
    return 25000;
  } else {
    return 0;
  }
}

app.post("/absensi/keluar", (req, res) => {
  const { karyawanId, keluar, tanggal } = req.body;

  con.query("UPDATE absensi SET keluar = ? WHERE id_kar = ? AND tanggal = ?", [keluar, karyawanId, tanggal], (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Absensi keluar");
    res.sendStatus(200);
  });
});

app.post("/izin", upload.single("bukti"), (req, res) => {
  const { karyawanId, keterangan, waktu, tanggal, alasan } = req.body;
  const bukti = req.file.filename;
  const sql = "INSERT INTO izin (id_kar, keterangan, waktu, tanggal, alasan, bukti) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [karyawanId, keterangan, waktu, tanggal, alasan, bukti];

  con.query(sql, values, (err, results) => {
    if (err) {
      console.err("Error inserting absence:", err);
      res.status(500).json({ error: "Failed to insert absence" });
    } else {
      console.log("Submit Izin Sukses");
      res.status(200).json({ message: "Izin disubmit" });

      con.query("UPDATE izin i JOIN karyawan k ON i.id_kar = k.id SET i.nama_kar = k.nama", (err, results) => {
        if (err) {
          console.err("Error executing SQL:", err);
        } else {
          console.log("tabel izin diupdate");
        }
      });
    }
  });
});

app.get("/gaji/:karyawanNama", (req, res) => {
  const karyawanNama = req.params.karyawanNama;

  const sql = `
    SELECT k.gambar ,k.nama, k.email,k.kontak, k.alamat,k.departemen, k.gapok, SUM(a.tunjangan) AS total_tunjangan , (k.gapok + SUM(a.tunjangan)) AS total_gaji
    FROM karyawan k
    INNER JOIN absensi a ON k.id = a.id_kar
    WHERE k.nama = ?
    GROUP BY k.id
  `;

  con.query(sql, [karyawanNama], (err, result) => {
    if (err) {
      console.err("Error fetching data:", err);
      return res.json({ err: "Failed to fetch  data" });
    }

    if (result.length === 0) {
      return res.json({ err: " Karyawan not found" });
    }
    const karyawan = result[0];

    return res.json({ karyawan });
  });
});

app.listen(8083, () => {
  console.log("Running");
});
