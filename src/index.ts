let words = ['PARCHIS', 'CLUEDO', 'LANGOSTA', 'DOMINICAL', 'ACERO', 'PERFUME', 'MINUTO', 'CANARIAS', 'PASTA ITALIANA', 'ESTACIÓN', 'VIETNAM', 'BARBERO', 'AJEDREZ', 'COMIDA RÁPIDA', 'HELADO', 'CARA', 'FISCAL', 'CARDENAL', 'TROMPETA', 'SOLTERONA', 'DEBER', 'LOS ANGELES', 'PUENTE LEVADIZO', 'OREJERAS', 'PEREGRINO', 'TOCAR', 'MOZART', 'DIADEMA', 'SODA', 'PATO DONALD', 'BUCEAR', 'AIRE', 'PARRILLA', 'LEOPARDO', 'FUERA DE LÍMITE', 'SONAJERO', 'ESCLAVO', 'EMPUJAR', 'REMO', 'SANTO', 'FANTASMA', 'DEBATE', 'SONROJARSE', 'LOBO DE MAR', 'PROPAGANDA', 'LUCES DE NEÓN', 'RAYOS X', 'POSTER', 'SEVILLANAS', 'BATMAN', 'CAFE', 'ATAÚD', 'INVENTOR', 'ESTÚPIDO', 'BALLENA', 'ESTÓMAGO', 'ALGODÓN AZÚCAR', 'VIERNES', 'MALABARISTA', 'BOLA NAFTALINA', 'PLEGAR', 'ALTO'];

let currentIndex = Math.floor(Math.random() * words.length);
let currentTime = 90;
let interval = setInterval(() => {
    nextTime();
    displayClock();
}, 1000);
let isIntervalRunning = false;

function displayWord() {
    let wordDisplay = document.getElementById("word-display");
    let alertContainer = document.getElementById("alert-container");

    if (words.length === 0) {
        if (alertContainer) {
            alertContainer.classList.remove("hidden");
        }
        return;
    }

    if (wordDisplay) {
        wordDisplay.innerText = words[currentIndex];
        words.splice(currentIndex, 1);
    }
}

function displayClock(){
    let seconds = document.getElementById("seconds");
    if (seconds){
        console.log(currentTime);
        seconds.innerText = currentTime.toString() + "s";
    }
}

function nextWord() {
    if (!isIntervalRunning) {
        resume();
    }
    if (words.length > 0) {
        currentIndex = Math.floor(Math.random() * words.length);
    } else {
        currentIndex = 0;
    }
}

function nextTime() {
    if (currentTime > 0) {
        return currentTime--;
    } else {
        currentTime = 90;
        return currentTime;
    }
}

function pause() {
    if (interval !== null) {
        clearInterval(interval);
        isIntervalRunning = false;
        updateButtonStyles();
    }
}

function resume() {
    if (!isIntervalRunning) {
        interval = setInterval(() => {
            nextTime();
            displayClock();
        }, 1000);
        isIntervalRunning = true;
        updateButtonStyles();
    }
}

function resetClock() {
    currentTime = 90;
    pause();
    displayClock();
}

function updateButtonStyles() {
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");

    if (isIntervalRunning) {
        if (startButton) {
            startButton.classList.remove("bg-green-500");
            startButton.classList.add("bg-gray-800");
        }
        if (pauseButton) {
            pauseButton.classList.remove("bg-gray-800");
            pauseButton.classList.add("bg-black");
        }
    } else {
        if (startButton) {
            startButton.classList.remove("bg-black");
            startButton.classList.add("bg-green-500");
        }
        if (pauseButton) {
            pauseButton.classList.remove("bg-black");
            pauseButton.classList.add("bg-gray-800");
        }
    }
}


displayWord();
resetClock();