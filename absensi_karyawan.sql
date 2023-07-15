-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Jul 2023 pada 13.06
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensi_karyawan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `id_kar` int(11) NOT NULL,
  `nama_kar` varchar(50) NOT NULL,
  `masuk` time DEFAULT NULL,
  `keluar` time DEFAULT NULL,
  `tanggal` date NOT NULL,
  `tunjangan` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `absensi`
--

INSERT INTO `absensi` (`id`, `id_kar`, `nama_kar`, `masuk`, `keluar`, `tanggal`, `tunjangan`) VALUES
(18, 2, 'Hana', '08:47:58', '09:22:47', '2023-07-11', '0.00'),
(29, 2, 'Hana', '21:22:46', NULL, '2023-07-12', '0.00'),
(40, 2, 'Hana', '14:53:42', '15:26:07', '2023-07-13', '0.00'),
(41, 2, 'Hana', '15:16:13', '15:26:07', '2023-07-13', '0.00'),
(42, 2, 'Hana', '03:16:16', '15:26:07', '2023-07-13', '0.00'),
(43, 2, 'Hana', '15:22:08', '15:26:07', '2023-07-13', '0.00'),
(44, 2, 'Hana', '15:26:06', '15:26:07', '2023-07-13', '0.00'),
(45, 2, 'Hana', '15:38:20', '17:16:10', '2023-07-14', '0.00'),
(46, 2, 'Hana', '17:16:08', '17:16:10', '2023-07-14', '0.00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `izin`
--

CREATE TABLE `izin` (
  `id` int(11) NOT NULL,
  `id_kar` int(11) DEFAULT NULL,
  `nama_kar` varchar(50) DEFAULT NULL,
  `waktu` time DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  `alasan` varchar(255) DEFAULT NULL,
  `bukti` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `izin`
--

INSERT INTO `izin` (`id`, `id_kar`, `nama_kar`, `waktu`, `tanggal`, `keterangan`, `alasan`, `bukti`) VALUES
(23, 2, 'Hana', '13:10:28', '2023-07-03', 'bdstg', 'fdsh', 'bukti_1688364628243.pdf'),
(24, 2, 'Hana', '13:18:59', '2023-07-03', 'dgss', 'Keterangan Izin', 'bukti_1688365139199.pdf'),
(26, 5, 'Sophia', '00:36:46', '2023-07-04', 'Sakit', 'Malaria', 'bukti_1688405806211.pdf'),
(28, 2, 'Hana', '05:50:45', '2023-07-09', 'Sakit', 'Malaria', 'bukti_1688856645820.pdf'),
(33, 2, 'Hana', '17:22:00', '2023-07-14', 'Sakit', 'Malaria', 'bukti_1689330120142.pdf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `karyawan`
--

CREATE TABLE `karyawan` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `kontak` varchar(50) NOT NULL,
  `departemen` varchar(50) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `gapok` decimal(10,2) NOT NULL,
  `gambar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `karyawan`
--

INSERT INTO `karyawan` (`id`, `nama`, `email`, `password`, `role`, `kontak`, `departemen`, `alamat`, `gapok`, `gambar`) VALUES
(2, 'Hana', 'hana@gmail.com', '1111', 'karyawan', '080807060504', 'IT Support', 'Jakarta', '4500000.00', 'gambar_1688246802164.jpg'),
(5, 'Sophia', 'sophia@gmail.com', '2222', 'karyawan', '081224345646', '3D Animation', 'Jawa Barat', '3000000.00', 'gambar_1688395642000.jpg'),
(9, 'Dana', 'dana@gmail.com', '1111', 'karyawan', '089797979347', 'Front End', 'Tangerang', '30000000.00', 'gambar_1688998830926.jpeg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(3, 'admin@gmail.com', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kar` (`id_kar`);

--
-- Indeks untuk tabel `izin`
--
ALTER TABLE `izin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kar` (`id_kar`);

--
-- Indeks untuk tabel `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `izin`
--
ALTER TABLE `izin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `karyawan`
--
ALTER TABLE `karyawan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`id_kar`) REFERENCES `karyawan` (`id`);

--
-- Ketidakleluasaan untuk tabel `izin`
--
ALTER TABLE `izin`
  ADD CONSTRAINT `izin_ibfk_1` FOREIGN KEY (`id_kar`) REFERENCES `karyawan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
