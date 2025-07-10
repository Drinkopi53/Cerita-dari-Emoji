document.addEventListener('DOMContentLoaded', () => {
    // --- SELEKSI DOM ---
    const emojiGrid = document.getElementById('emoji-grid');
    const selectedEmojisContainer = document.getElementById('selected-emojis-container');
    const generateStoryButton = document.getElementById('generate-story-button');
    const storyOutput = document.getElementById('story-output');
    const emojiSearchInput = document.getElementById('emoji-search');
    const categoryButtons = document.querySelectorAll('.category-button');
    const themeToggleButton = document.getElementById('theme-toggle');
    const aboutButton = document.getElementById('about-button');
    const aboutModal = document.getElementById('about-modal');
    const closeModalButton = document.querySelector('.modal .close-button');
    const randomEmojiButton = document.getElementById('random-emoji-button');
    const copyStoryButton = document.getElementById('copy-story-button');
    const newStoryButton = document.getElementById('new-story-button');


    // --- DATA EMOJI (Contoh, bisa diperluas atau diambil dari API) ---
    const allEmojis = [
        // Smileys & People
        { emoji: '😀', category: 'smileys', keywords: ['senyum', 'wajah', 'gembira'] },
        { emoji: '😂', category: 'smileys', keywords: ['tertawa', 'lucu', 'air mata'] },
        { emoji: '😍', category: 'smileys', keywords: ['cinta', 'hati', 'mata'] },
        { emoji: '🤔', category: 'smileys', keywords: ['berpikir', 'bingung'] },
        { emoji: '🥳', category: 'smileys', keywords: ['pesta', 'selamat'] },
        { emoji: '😭', category: 'smileys', keywords: ['menangis', 'sedih'] },
        { emoji: '👨‍💻', category: 'smileys', keywords: ['programmer', 'komputer', 'kerja'] },
        { emoji: '👩‍🎨', category: 'smileys', keywords: ['seniman', 'lukis'] },
        { emoji: '🧑‍🚀', category: 'smileys', keywords: ['astronot', 'luar angkasa'] },
        { emoji: '🦸', category: 'smileys', keywords: ['superhero', 'pahlawan'] },

        // Animals & Nature
        { emoji: '🐶', category: 'animals', keywords: ['anjing', 'peliharaan'] },
        { emoji: '🐱', category: 'animals', keywords: ['kucing', 'peliharaan'] },
        { emoji: '🦊', category: 'animals', keywords: ['rubah'] },
        { emoji: '🌲', category: 'animals', keywords: ['pohon', 'alam', 'hutan'] },
        { emoji: '🌸', category: 'animals', keywords: ['bunga', 'mekar'] },
        { emoji: '🌊', category: 'animals', keywords: ['ombak', 'laut', 'air'] },
        { emoji: '☀️', category: 'animals', keywords: ['matahari', 'cerah'] },
        { emoji: '🌙', category: 'animals', keywords: ['bulan', 'malam'] },
        { emoji: '⭐', category: 'animals', keywords: ['bintang'] },
        { emoji: '🌍', category: 'animals', keywords: ['bumi', 'dunia', 'planet'] },

        // Food & Drink
        { emoji: '🍕', category: 'food', keywords: ['pizza', 'makanan'] },
        { emoji: '🍔', category: 'food', keywords: ['burger', 'makanan'] },
        { emoji: '🍦', category: 'food', keywords: ['es krim', 'manis'] },
        { emoji: '☕', category: 'food', keywords: ['kopi', 'minuman'] },
        { emoji: '🍎', category: 'food', keywords: ['apel', 'buah'] },
        { emoji: '🥦', category: 'food', keywords: ['brokoli', 'sayur'] },
        { emoji: '🎉', category: 'smileys', keywords: ['pesta', 'selamat', 'konfeti'] }, // Duplikat untuk demo
        { emoji: '🎈', category: 'smileys', keywords: ['balon', 'pesta'] },
        { emoji: '🎁', category: 'smileys', keywords: ['hadiah', 'kado', 'pesta'] },
        { emoji: '📚', category: 'objects', keywords: ['buku', 'belajar', 'membaca'] },
        { emoji: '💡', category: 'objects', keywords: ['lampu', 'ide'] },
        { emoji: '🔑', category: 'objects', keywords: ['kunci'] },
        { emoji: '🚗', category: 'travel', keywords: ['mobil', 'kendaraan'] },
        { emoji: '✈️', category: 'travel', keywords: ['pesawat', 'terbang'] },
        { emoji: '🏖️', category: 'travel', keywords: ['pantai', 'liburan'] },
    ];

    let selectedEmojis = [];
    const MAX_EMOJIS = 5;
    const MIN_EMOJIS = 3;

    // --- RENDER EMOJI ---
    function renderEmojis(emojisToRender = allEmojis) {
        emojiGrid.innerHTML = ''; // Bersihkan grid sebelum render ulang
        emojisToRender.forEach(emojiData => {
            const emojiItem = document.createElement('div');
            emojiItem.classList.add('emoji-item');
            emojiItem.textContent = emojiData.emoji;
            emojiItem.dataset.emoji = emojiData.emoji; // Simpan data emoji

            if (selectedEmojis.includes(emojiData.emoji)) {
                emojiItem.classList.add('selected');
            }

            emojiItem.addEventListener('click', () => toggleEmojiSelection(emojiData.emoji, emojiItem));
            emojiGrid.appendChild(emojiItem);
        });
    }

    // --- PEMILIHAN EMOJI ---
    function toggleEmojiSelection(emoji, emojiItemElement) {
        const index = selectedEmojis.indexOf(emoji);
        if (index > -1) { // Emoji sudah dipilih, batalkan pilihan
            selectedEmojis.splice(index, 1);
            emojiItemElement.classList.remove('selected');
        } else { // Emoji belum dipilih
            if (selectedEmojis.length < MAX_EMOJIS) {
                selectedEmojis.push(emoji);
                emojiItemElement.classList.add('selected');
            } else {
                // Beri feedback jika sudah mencapai batas maksimal (opsional)
                // alert(`Maksimal ${MAX_EMOJIS} emoji boleh dipilih.`);
                // Atau bisa juga dengan menggoyangkan container emoji terpilih
                selectedEmojisContainer.classList.add('shake');
                setTimeout(() => selectedEmojisContainer.classList.remove('shake'), 300);
            }
        }
        updateSelectedEmojisDisplay();
        validateEmojiCount();
    }

    // --- UPDATE TAMPILAN EMOJI TERPILIH ---
    function updateSelectedEmojisDisplay() {
        selectedEmojisContainer.innerHTML = '';
        selectedEmojis.forEach(emoji => {
            const pill = document.createElement('span');
            pill.classList.add('selected-emoji-pill');
            pill.textContent = emoji;

            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-emoji');
            removeBtn.innerHTML = '&times;'; // Karakter 'x'
            removeBtn.title = "Hapus emoji ini";
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Hindari trigger event lain
                deselectEmoji(emoji);
            });
            pill.appendChild(removeBtn);
            pill.addEventListener('click', () => deselectEmoji(emoji)); // Klik pil juga menghapus
            selectedEmojisContainer.appendChild(pill);
        });
         // Tambahkan placeholder jika tidak ada emoji yang dipilih
        if (selectedEmojis.length === 0) {
            const placeholder = document.createElement('span');
            placeholder.textContent = 'Belum ada emoji dipilih';
            placeholder.style.color = getComputedStyle(document.body).getPropertyValue('color') === '#333' || getComputedStyle(document.body).getPropertyValue('color') === 'rgb(51, 51, 51)' ? '#888' : '#bbb';
            selectedEmojisContainer.appendChild(placeholder);
        }
    }

    function deselectEmoji(emoji) {
        const index = selectedEmojis.indexOf(emoji);
        if (index > -1) {
            selectedEmojis.splice(index, 1);
            // Update tampilan grid utama juga
            const emojiInGrid = emojiGrid.querySelector(`.emoji-item[data-emoji="${emoji}"]`);
            if (emojiInGrid) {
                emojiInGrid.classList.remove('selected');
            }
            updateSelectedEmojisDisplay();
            validateEmojiCount();
        }
    }


    // --- VALIDASI JUMLAH EMOJI ---
    function validateEmojiCount() {
        const count = selectedEmojis.length;
        if (count >= MIN_EMOJIS && count <= MAX_EMOJIS) {
            generateStoryButton.disabled = false;
            generateStoryButton.title = "Buat cerita dari emoji pilihanmu!";
        } else {
            generateStoryButton.disabled = true;
            if (count < MIN_EMOJIS) {
                 generateStoryButton.title = `Pilih minimal ${MIN_EMOJIS} emoji.`;
            } else if (count > MAX_EMOJIS) {
                 generateStoryButton.title = `Pilih maksimal ${MAX_EMOJIS} emoji.`;
            }
        }
    }

    // --- FUNGSI "BUAT CERITA!" ---
    generateStoryButton.addEventListener('click', () => {
        if (!generateStoryButton.disabled) {
            console.log("Emoji yang dipilih untuk cerita:", selectedEmojis);
            // Logika untuk mengirim ke backend dan menampilkan cerita akan ditambahkan di sini
            // Untuk sekarang, tampilkan pesan placeholder
            storyOutput.innerHTML = `<p>Membuat cerita dengan emoji: ${selectedEmojis.join(' ')}...</p><p><em>(Fungsionalitas pembuatan cerita sebenarnya akan dihubungkan ke backend.)</em></p>`;
            copyStoryButton.style.display = 'inline-block'; // Tampilkan tombol salin (meski belum ada cerita asli)
            newStoryButton.style.display = 'inline-block';
        }
    });

    // --- FUNGSI "SALIN CERITA" ---
    copyStoryButton.addEventListener('click', () => {
        const storyText = storyOutput.textContent || storyOutput.innerText;
        navigator.clipboard.writeText(storyText).then(() => {
            copyStoryButton.textContent = 'Tersalin!';
            setTimeout(() => {
                copyStoryButton.textContent = 'Salin Cerita';
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin cerita: ', err);
            alert('Gagal menyalin cerita. Coba lagi secara manual.');
        });
    });

    // --- FUNGSI "BUAT CERITA BARU" ---
    newStoryButton.addEventListener('click', () => {
        selectedEmojis = [];
        renderEmojis(); // Re-render grid untuk menghilangkan .selected class
        updateSelectedEmojisDisplay();
        validateEmojiCount();
        storyOutput.innerHTML = '<p>Pilih 3 hingga 5 emoji dan klik "Buat Cerita!" untuk melihat keajaiban!</p>';
        copyStoryButton.style.display = 'none';
        newStoryButton.style.display = 'none';
        emojiSearchInput.value = ''; // Kosongkan pencarian
        filterEmojis(); // Tampilkan semua emoji lagi
    });


    // --- PENCARIAN EMOJI ---
    emojiSearchInput.addEventListener('input', (e) => {
        filterEmojis(e.target.value);
    });

    // --- FILTER KATEGORI ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterEmojis(emojiSearchInput.value, button.dataset.category);
        });
    });

    function filterEmojis(searchTerm = '', category = 'all') {
        const term = searchTerm.toLowerCase().trim();
        const filtered = allEmojis.filter(emojiData => {
            const matchesCategory = category === 'all' || emojiData.category === category;
            const matchesSearch = emojiData.emoji.includes(term) ||
                                  (emojiData.keywords && emojiData.keywords.some(kw => kw.toLowerCase().includes(term)));
            return matchesCategory && matchesSearch;
        });
        renderEmojis(filtered);
    }

    // --- TOMBOL EMOJI ACAK ---
    randomEmojiButton.addEventListener('click', () => {
        selectedEmojis = []; // Kosongkan pilihan saat ini
        const shuffledEmojis = [...allEmojis].sort(() => 0.5 - Math.random());
        const randomCount = Math.floor(Math.random() * (MAX_EMOJIS - MIN_EMOJIS + 1)) + MIN_EMOJIS; // Antara MIN dan MAX

        for (let i = 0; i < randomCount && i < shuffledEmojis.length; i++) {
            selectedEmojis.push(shuffledEmojis[i].emoji);
        }

        renderEmojis(); // Re-render grid untuk menandai yang terpilih secara acak
        updateSelectedEmojisDisplay();
        validateEmojiCount();
    });


    // --- MODE GELAP/TERANG ---
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Simpan preferensi tema (opsional, menggunakan localStorage)
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleButton.textContent = "Mode Terang";
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleButton.textContent = "Mode Gelap";
        }
        updateSelectedEmojisDisplay(); // Update warna placeholder jika ada
    });

    // Cek tema tersimpan saat load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = "Mode Terang";
    } else {
        themeToggleButton.textContent = "Mode Gelap";
    }


    // --- MODAL "TENTANG" ---
    aboutButton.addEventListener('click', () => {
        aboutModal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });


    // --- INISIALISASI ---
    renderEmojis(); // Tampilkan semua emoji saat pertama kali load
    updateSelectedEmojisDisplay(); // Pastikan tampilan emoji terpilih konsisten
    validateEmojiCount(); // Set status tombol generate awal
});

// CSS untuk animasi shake (bisa juga di file CSS)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
.shake {
    animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
}
@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
    40%, 60% { transform: translate3d(3px, 0, 0); }
}`;
document.head.appendChild(styleSheet);
