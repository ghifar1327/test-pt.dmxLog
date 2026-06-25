# Dokumentasi Fitur Prototype Aplikasi Rental Pallet

## 1. Pendahuluan
Aplikasi ini merupakan prototype rental pallet berbasis web dengan fitur lengkap untuk manajemen produk, transaksi, dan pengguna. Seluruh data disimpan pada LocalStorage dan project mengikuti struktur scalable serta best practice React (tanpa TypeScript).

## 2. Teknologi yang Digunakan
- React Router DOM (navigasi dan proteksi halaman)
- React Hook Form & Yup Validation (form & validasi)
- Redux Toolkit & Redux Persist (state management & persistensi)
- React Icons (ikon UI)
- React Toastify (notifikasi sukses/error)
- LocalStorage (penyimpanan data)

## 3. Role Pengguna
- **User**
- **Admin** (kode referensi: `4Pl!k@s1pROTotYp3`)

## 4. Fitur User
- Register
- Login
- Home
- About
- Contact Us
- Product
- Cart
- Payment
- Transaction History

## 5. Fitur Admin
- Dashboard
- Product Management (CRUD)
- User Management
- Transaction Management

## 6. Struktur Data
### Product Pallet
- id
- name
- image
- size
- price
- stock

### Transaction
- transactionId
- userName
- address
- phone
- rentalDuration
- items
- totalAmount
- transactionDate

### Item Transaction
- palletName
- quantity
- subtotal

## 7. Business Rules
- User wajib login sebelum add to cart
- User wajib login sebelum payment
- Quantity cart tidak boleh melebihi stock
- Payment berhasil akan mengurangi stock
- Cart dikosongkan setelah payment berhasil
- Gunakan toast notification untuk seluruh success/error
- Admin yang telah login tidak bisa akses halaman untuk user dan tidak bisa melakukan transaksi
- User dan public tidak bisa mengakses halaman admin
- Gunakan protected route berdasarkan role

## 8. UI Requirements
- Responsive Desktop, Tablet, Mobile
- Mobile menggunakan hamburger menu
- Modern marketplace design
- Sidebar dashboard admin
- Dashboard statistics cards
- Product card dengan hover effect
- Loading state dan empty state
- Tema terang

## 9. Struktur Project
- Mengikuti scalable dan best practice React (tanpa TypeScript)

