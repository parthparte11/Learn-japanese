// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // ----- Dictionary Page -----
    if (document.getElementById('dictionaryBody')) {
        const tbody = document.getElementById('dictionaryBody');
        const searchInput = document.getElementById('searchInput');

        function renderDictionary(filter = '') {
            tbody.innerHTML = '';
            const filtered = dictionaryData.filter(item =>
                item.japanese.includes(filter) || item.english.toLowerCase().includes(filter.toLowerCase())
            );
            filtered.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.japanese}</td><td>${item.english}</td>`;
                tbody.appendChild(row);
            });
        }

        renderDictionary();
        searchInput.addEventListener('input', (e) => renderDictionary(e.target.value));
    }

    // ----- Kanji Page -----
    if (document.getElementById('kanjiBody')) {
        const tbody = document.getElementById('kanjiBody');
        kanjiData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.kanji}</td><td>${item.meaning}</td><td>${item.kunyomi}</td><td>${item.onyomi}</td>`;
            tbody.appendChild(row);
        });
    }

    // ----- Flashcard Test Page -----
    if (document.getElementById('flashcard')) {
        const categorySelect = document.getElementById('category');
        const newCardBtn = document.getElementById('newCard');
        const flashcard = document.getElementById('flashcard');
        const cardFront = document.getElementById('cardFront');
        const cardBack = document.getElementById('cardBack');
        const flipBtn = document.getElementById('flipBtn');

        let currentSet = flashcardSets.hiragana;
        let currentIndex = 0;

        function loadCard() {
            const card = currentSet[currentIndex];
            cardFront.textContent = card.front;
            cardBack.textContent = card.back;
            // Reset flip state
            flashcard.classList.remove('flipped');
        }

        function updateSet() {
            const category = categorySelect.value;
            currentSet = flashcardSets[category];
            currentIndex = 0;
            loadCard();
        }

        categorySelect.addEventListener('change', updateSet);
        newCardBtn.addEventListener('click', () => {
            currentIndex = Math.floor(Math.random() * currentSet.length);
            loadCard();
        });

        flipBtn.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });

        // Optional: click on card also flips
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });

        // Initial load
        updateSet();
    }
});