var words = ['palabra1', 'palabra2', 'palabra3', 'palabra4', 'palabra5'];
var currentIndex = 0;
function displayWord() {
    var wordDisplay = document.getElementById("word-display");
    if (wordDisplay) {
        wordDisplay.innerText = words[currentIndex];
    }
}
function nextWord() {
    console.log('next word');
    if (currentIndex < words.length - 1) {
        return words[currentIndex++];
    }
    else {
        currentIndex = 0;
        return words[currentIndex];
    }
}
displayWord();
