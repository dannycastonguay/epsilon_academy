fetch("https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt")
    .then(response => response.text())
    .then(text => {
        const allWords = text.split("\n");
        const wordDict = allWords.filter(word => word.length === 5);
        wordleSolver(wordDict);
    });

const logCache = {};

function log2Cached(n) {
    if (!logCache.hasOwnProperty(n)) {
        logCache[n] = Math.log2(n);
    }
    return logCache[n];
}

function calcEntropy(guess, possibleWords, total) {
    const freq = {};
    for (const word of possibleWords) {
        const result = Array.from({ length: 5 }, (_, i) =>
            word[i] === guess[i] ? 'G' : guess.includes(word[i]) ? 'O' : 'X'
        ).join('');

        freq[result] = (freq[result] || 0) + 1;
    }

    return -Object.values(freq).reduce((acc, count) =>
        acc + (count / total) * log2Cached(count / total), 0
    );
}

function wordleSolver(wordDict) {
    let possibleWords = new Set(wordDict);
    const orangeIndices = new Set();

    while (true) {
        const sampleSize = Math.min(500, possibleWords.size);
        const sampleWords = Array.from(possibleWords).sort(() => Math.random() - 0.5).slice(0, sampleSize);

        const validSampleWords = sampleWords.filter(word =>
            Array.from(orangeIndices).every(i => word[i] !== word[i])
        );

        const bestGuess = validSampleWords.reduce((maxWord, word) => {
            const entropy = calcEntropy(word, validSampleWords, validSampleWords.length);
            return entropy > calcEntropy(maxWord, validSampleWords, validSampleWords.length) ? word : maxWord;
        }, validSampleWords[0]);

        const userInput = prompt(`Sample guesses: ${validSampleWords.slice(0, 10).join(', ')}. \n Enter your guess and result (e.g. apple GGOXX):`);

        if (!userInput || !userInput.includes(' ')) {
            alert("Invalid input format. Please enter a guess and result separated by a space.");
            continue;
        }

        const [guess, result] = userInput.split(' ');

        if (!possibleWords.has(guess) || (result && result.length !== 5)) {
            alert("Invalid input. Try again.");
            continue;
        }

        possibleWords.delete(guess);

        const greenIndices = result.split('').map((c, i) => c === 'G' ? i : null).filter(i => i !== null);
        possibleWords = new Set(Array.from(possibleWords).filter(word =>
            greenIndices.every(i => word[i] === guess[i])
        ));

        orangeIndices.clear();
        for (let i = 0; i < result.length; i++) {
            if (result[i] === 'O') {
                orangeIndices.add(i);
            }
        }

        const grayLetters = result.split('').map((c, i) => c === 'X' ? guess[i] : null).filter(c => c !== null);
        possibleWords = new Set(Array.from(possibleWords).filter(word =>
            !grayLetters.some(c => word.includes(c))
        ));

        if (result === 'GGGGG') {
            alert("Game won!");
            break;
        }
    }
}
