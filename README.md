# Cerita-dari-Emoji

Aplikasi web interaktif yang memungkinkan pengguna menghasilkan cerita pendek dan unik berdasarkan emoji pilihan mereka, didukung oleh kecerdasan buatan.

## Gambaran Umum

`Cerita-dari-Emoji` adalah aplikasi web yang inovatif yang memanfaatkan kekuatan AI untuk mengubah serangkaian emoji menjadi narasi misteri yang menarik. Pengguna dapat memilih antara 3 hingga 5 emoji, dan aplikasi akan menggunakan Google Gemini API untuk membuat cerita pendek yang koheren dan kreatif berdasarkan pilihan tersebut. Proyek ini berfungsi sebagai demonstrasi bagaimana teknologi AI dapat diintegrasikan untuk tujuan kreativitas dan hiburan.

## Fitur Utama

*   **Pemilihan Emoji Interaktif**: Antarmuka yang mudah digunakan untuk memilih 3 hingga 5 emoji dari daftar yang tersedia.
*   **Pencarian & Filter Emoji**: Cari emoji berdasarkan kata kunci atau filter berdasarkan kategori untuk navigasi yang lebih cepat.
*   **Pembuatan Cerita Bertenaga AI**: Menggunakan Google Gemini API untuk menghasilkan cerita misteri pendek yang unik berdasarkan kombinasi emoji yang dipilih.
*   **Tombol Acak Emoji**: Fitur untuk memilih emoji secara acak, memberikan inspirasi untuk cerita baru.
*   **Salin Cerita**: Kemampuan untuk menyalin cerita yang dihasilkan ke clipboard dengan mudah.
*   **Mode Gelap/Terang**: Beralih antara tema visual terang dan gelap untuk kenyamanan pengguna.
*   **Informasi "Tentang" Aplikasi**: Modal informatif yang menjelaskan tujuan aplikasi dan teknologi yang digunakan.

## Teknologi yang Digunakan

*   **Frontend**:
    *   [`HTML`](https://developer.mozilla.org/en-US/docs/Web/HTML)
    *   [`CSS`](https://developer.mozilla.org/en-US/docs/Web/CSS)
    *   [`JavaScript`](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   **Backend**:
    *   [`Node.js`](https://nodejs.org/)
    *   [`Express.js`](https://expressjs.com/)
*   **Kecerdasan Buatan**:
    *   [`Google Gemini API`](https://ai.google.dev/models/gemini)
*   **Dependencies (Backend)**:
    *   `@google/generative-ai`: Klien Node.js untuk Google Gemini API.
    *   `cors`: Middleware untuk mengaktifkan Cross-Origin Resource Sharing.
    *   `dotenv`: Memuat variabel lingkungan dari file `.env`.
    *   `express`: Kerangka kerja aplikasi web untuk Node.js.
*   **Dev Dependencies**:
    *   `nodemon`: Alat untuk membantu pengembangan aplikasi berbasis Node.js dengan secara otomatis me-restart server saat perubahan file terdeteksi.

## Persyaratan Sistem

Untuk menjalankan aplikasi ini, Anda memerlukan:

*   [`Node.js`](https://nodejs.org/en/download/) (versi 14 atau lebih tinggi direkomendasikan)
*   [`npm`](https://www.npmjs.com/get-npm) (Node Package Manager, biasanya terinstal bersama Node.js)

## Panduan Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek secara lokal:

1.  **Kloning Repositori**:
    ```bash
    git clone https://github.com/Drinkopi53/Cerita-dari-Emoji.git
    cd Cerita-dari-Emoji
    ```

2.  **Instal Dependensi**:
    Instal semua dependensi yang diperlukan untuk proyek backend:
    ```bash
    npm install
    ```

## Konfigurasi

Aplikasi ini memerlukan Kunci API Google Gemini untuk berfungsi.

1.  **Dapatkan Kunci API Gemini**:
    *   Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey) dan buat Kunci API baru.

2.  **Buat File `.env`**:
    *   Di direktori root proyek Anda, buat file baru bernama `.env`.

3.  **Tambahkan Kunci API Anda**:
    *   Buka file `.env` dan tambahkan baris berikut, ganti `YOUR_GEMINI_API_KEY` dengan kunci API yang Anda dapatkan:
    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
    *   Anda juga dapat mengonfigurasi port server secara opsional:
    ```
    PORT=3000
    ```

## Contoh Penggunaan

Setelah instalasi dan konfigurasi, Anda dapat menjalankan aplikasi:

1.  **Mulai Server Backend**:
    ```bash
    npm start
    # Atau untuk pengembangan dengan auto-restart:
    # npm run dev
    ```
    Server akan berjalan di `http://localhost:3000` (atau port yang Anda konfigurasikan).

2.  **Akses Aplikasi Web**:
    *   Buka browser web Anda dan navigasikan ke `http://localhost:3000`.
    *   Pilih 3 hingga 5 emoji dari grid. Anda dapat menggunakan fitur pencarian atau filter kategori.
    *   Klik tombol "Buat Cerita!" untuk menghasilkan cerita.
    *   Anda dapat menyalin cerita atau membuat cerita baru.

## Struktur Proyek

```
.
├── .env                  # Variabel lingkungan (mis. GEMINI_API_KEY)
├── index.html            # Halaman HTML utama aplikasi frontend
├── package.json          # Metadata proyek dan dependensi backend
├── package-lock.json     # Mengunci versi dependensi
├── README.md             # Dokumentasi proyek ini
├── script.js             # Logika JavaScript frontend
├── server.js             # Server backend Node.js dengan API Gemini
└── style.css             # Gaya CSS untuk frontend
```

*   `index.html`: Titik masuk frontend, menyediakan struktur dasar UI.
*   `style.css`: Mengatur tampilan dan nuansa aplikasi, termasuk mode gelap/terang.
*   `script.js`: Menangani interaktivitas frontend, termasuk pemilihan emoji, pencarian, dan komunikasi dengan backend.
*   `server.js`: Server backend yang mengekspos endpoint API untuk menghasilkan cerita menggunakan Google Gemini API.
*   `.env`: Berisi variabel lingkungan sensitif seperti Kunci API Gemini.

## Pedoman Kontribusi

Kami menyambut kontribusi! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1.  Fork repositori ini.
2.  Buat branch baru untuk fitur atau perbaikan Anda (`git checkout -b feature/nama-fitur-baru`).
3.  Lakukan perubahan Anda dan pastikan kode Anda mengikuti gaya yang ada.
4.  Tulis pesan commit yang jelas (`git commit -m 'Tambahkan fitur baru: deskripsi singkat'`).
5.  Push perubahan Anda ke branch Anda (`git push origin feature/nama-fitur-baru`).
6.  Buka Pull Request.
