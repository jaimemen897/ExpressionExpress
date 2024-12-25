let words = ['palabra1', 'palabra2', 'palabra3', 'palabra4', 'palabra5'];
let currentIndex = 0;

function displayWord() {
    let wordDisplay = document.getElementById("word-display");
    if (wordDisplay){
        wordDisplay.innerText = words[currentIndex];
    }
}

function nextWord() {
    console.log('next word');
    if (currentIndex < words.length - 1) {
        return words[currentIndex++];
    } else {
        currentIndex = 0;
        return words[currentIndex];
    }
}

displayWord();