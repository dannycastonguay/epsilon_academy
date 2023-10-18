import { ask } from '../common.js';

export async function wordle() {


    // Step 1: Fetch word list from URL
    fetch('https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt')
        .then(response => response.text())
        .then(text => {
            const allWords = text.toLowerCase().split('\n');

            // Step 2: Filter for 5-letter words
            const fiveLetterWords = allWords.filter(word => word.length === 5);

            solveWordle(fiveLetterWords);
        });

    function solveWordle(fiveLetterWords) {
        let wordPool = [...fiveLetterWords];

        while (true) {
            // Step 3: Random sample of 500 words or the length of the set
            const sample = getRandomSample(wordPool, 500);

            // Step 4: Top 10 words that reduce entropy
            const topNWords = getTopNWords(sample, 10);

            // Step 5: Prompt user

            const remainingWords = wordPool.length;
            const userWord = prompt(`Enter one of the suggested words or any 5-letter word: ${topNWords.join(', ')}. Words left: ${remainingWords}`).toLowerCase();
            const feedback = prompt("Enter feedback (G: correct position, Y: wrong position, X: not found)").toLowerCase();

            // Step 6: Check for win condition
            if (feedback === "ggggg") {
                alert("Solved!");
                break;
            }

            // Step 7: Filter word pool based on feedback
            wordPool = filterWords(wordPool, userWord, feedback);

            // Step 8 is implicit (loop continues)
        }
    }

    function getRandomSample(array, n) {
        // Create a copy of the original array
        const arrCopy = [...array];

        // The array to store the random sample
        let sample = [];

        // Loop until sample contains n elements
        for (let i = 0; i < n; i++) {
            if (arrCopy.length === 0) {
                break;
            }
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * arrCopy.length);

            // Add the element at the random index to the sample
            sample.push(arrCopy[randomIndex]);

            // Remove the chosen element from arrCopy
            arrCopy.splice(randomIndex, 1);
        }

        return sample;
    }

    function filterWords(wordPool, userWord, feedback) {
        return wordPool.filter(word => {
            for (let i = 0; i < 5; i++) {
                const fb = feedback[i];
                const uw = userWord[i];
                const w = word[i];

                // Check for g: Letter in correct position
                if (fb === 'g' && uw !== w) {
                    return false;
                }

                // Check for x: Letter not found in word
                if (fb === 'x' && word.includes(uw)) {
                    return false;
                }

                // Check for y: Letter in word but not in correct position
                if (fb === 'y' && (!word.includes(uw) || uw === w)) {
                    return false;
                }
            }
            return true;
        });
    }


    function getTopNWords(array, N) {
        let frequencyMap = Array.from({ length: 5 }, () => ({}));

        // Calculate frequency of each letter at each position
        array.forEach(word => {
            for (let i = 0; i < 5; i++) {
                const char = word[i];
                frequencyMap[i][char] = (frequencyMap[i][char] || 0) + 1;
            }
        });

        // Score words based on frequency of their letters at each position
        const scoredWords = array.map(word => {
            let score = 0;
            for (let i = 0; i < 5; i++) {
                const char = word[i];
                score += frequencyMap[i][char];
            }
            return { word, score };
        });

        // Sort by score and take top N words
        scoredWords.sort((a, b) => b.score - a.score);
        return scoredWords.slice(0, N).map(item => item.word);
    }

}