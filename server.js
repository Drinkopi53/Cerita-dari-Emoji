import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Konfigurasi dotenv untuk memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Middleware untuk parsing body permintaan JSON

// Middleware sederhana untuk logging setiap permintaan (opsional)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Endpoint dasar untuk mengecek server berjalan
app.get('/', (req, res) => {
    res.send('Server Cerita dari Emoji berjalan!');
});

// Implementasi endpoint API akan ditambahkan di langkah berikutnya

// --- Implementasi Endpoint /api/generate-story ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("Kesalahan: GEMINI_API_KEY tidak ditemukan di variabel lingkungan.");
    console.log("Pastikan Anda telah membuat file .env dan menambahkan GEMINI_API_KEY Anda.");
    // process.exit(1); // Pertimbangkan untuk menghentikan server jika API Key tidak ada
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/api/generate-story', async (req, res) => {
    const { emojis } = req.body;

    if (!emojis || !Array.isArray(emojis) || emojis.length === 0) {
        return res.status(400).json({ error: 'Request body harus menyertakan array "emojis" yang tidak kosong.' });
    }
    if (emojis.length < 3 || emojis.length > 5) {
        return res.status(400).json({ error: 'Jumlah emoji harus antara 3 dan 5.' });
    }

    const emojiString = emojis.join(' '); // Gabungkan emoji menjadi string
    const prompt = `Tuliskan sebuah cerita misteri pendek dengan maksimal 100 kata berdasarkan rangkaian emoji ini: ${emojiString}.`;

    console.log(`Menerima permintaan untuk emoji: ${emojiString}`);
    console.log(`Prompt untuk Gemini: "${prompt}"`);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const story = response.text();

        console.log("Cerita berhasil dibuat:", story);
        res.json({ story });

    } catch (error) {
        console.error('Error saat memanggil Gemini API:', error);
        // Periksa apakah error memiliki detail yang bisa dikirim ke klien
        let errorMessage = 'Gagal menghasilkan cerita. Silakan coba lagi.';
        if (error.message) {
            errorMessage = `Error dari Gemini API: ${error.message}`;
        }
        // Hindari mengirim detail error internal yang sensitif ke klien
        // Untuk error spesifik dari API (misalnya, quota, API key salah), mungkin perlu penanganan khusus
        if (error.toString().includes("API key not valid")) {
             errorMessage = "API Key Gemini tidak valid. Periksa konfigurasi server.";
        }

        res.status(500).json({ error: errorMessage });
    }
});
// ----------------------------------------------------

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

// Ekspor app untuk potensi pengujian di masa depan (opsional)
export default app;
