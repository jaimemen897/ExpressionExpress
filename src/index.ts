let words = ['PARCHIS', 'CLUEDO', 'LANGOSTA', 'DOMINICAL', 'ACERO', 'PERFUME', 'MINUTO', 'CANARIAS', 'PASTA ITALIANA', 'ESTACIÓN', 'VIETNAM', 'BARBERO', 'AJEDREZ', 'COMIDA RÁPIDA', 'HELADO', 'CARA', 'FISCAL', 'CARDENAL', 'TROMPETA', 'SOLTERONA', 'DEBER', 'LOS ANGELES', 'PUENTE LEVADIZO', 'OREJERAS', 'PEREGRINO', 'TOCAR', 'MOZART', 'DIADEMA', 'SODA', 'PATO DONALD', 'BUCEAR', 'AIRE', 'PARRILLA', 'LEOPARDO', 'FUERA DE LÍMITE', 'SONAJERO', 'ESCLAVO', 'EMPUJAR', 'REMO', 'SANTO', 'FANTASMA', 'DEBATE', 'SONROJARSE', 'LOBO DE MAR', 'PROPAGANDA', 'LUCES DE NEÓN', 'RAYOS X', 'POSTER', 'SEVILLANAS', 'BATMAN', 'CAFE', 'ATAÚD', 'INVENTOR', 'ESTÚPIDO', 'BALLENA', 'ESTÓMAGO', 'ALGODÓN AZÚCAR', 'VIERNES', 'MALABARISTA', 'BOLA NAFTALINA', 'PLEGAR', 'ALTO'];
const time = 10;

let currentIndex = Math.floor(Math.random() * words.length);
let currentTime = time;
let interval = setInterval(() => {
    nextTime();
    displayClock();
}, 1000);
let isIntervalRunning = false;

function displayWord() {
    let wordDisplay = document.getElementById("word-display");

    if (words.length === 0) {
        showAlert("Se han acabado las palabras");
        resetClock();
        return;
    }

    if (wordDisplay) {
        wordDisplay.innerText = words[currentIndex];
        words.splice(currentIndex, 1);
    }
}

function showAlert(message: string) {
    let alertContainer = document.getElementById("alert-container");
    let alertMessage = document.getElementById("alert-message");

    if (alertContainer && alertMessage) {
        alertMessage.innerText = message;
        alertContainer.classList.remove("hidden");
    }
}

function displayClock(){
    let seconds = document.getElementById("seconds");
    if (seconds){
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

function playSoundBasedOnTime() {
    let beepSound = document.getElementById("beep-sound") as HTMLAudioElement;
    let beepSound2 = document.getElementById("beep-sound2") as HTMLAudioElement;
    let beepSound3 = document.getElementById("beep-sound3") as HTMLAudioElement;
    let beepSound4 = document.getElementById("beep-sound") as HTMLAudioElement;
    let beepSound5 = document.getElementById("beep-sound") as HTMLAudioElement;
    let beepSound6 = document.getElementById("beep-sound") as HTMLAudioElement;

    if (currentTime > 20) {
        if (currentTime % 5 === 0 && beepSound) {
            beepSound.play();
        }
    } else if (currentTime > 10) {
        if (currentTime % 2 === 0 && beepSound) {
            beepSound.play();
        }
    } else if (currentTime > 5) {
        if (currentTime % 1 === 0 && beepSound) {
            beepSound.play();
        }
    } else if (currentTime == 0){
        if (beepSound3) {
            console.log("beepSound3");
            beepSound3.play();
        }
    } else {
        if (beepSound && beepSound2) {
            beepSound.play();
            beepSound2.play();
            setTimeout(() => beepSound2.play(), 143);
        }
    }
}

function nextTime() {
    playSoundBasedOnTime();

    if (currentTime > 0) {
        return currentTime--;
    } else {
        showAlert("Se ha acabado el tiempo");
        pause();
        return time;
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
    currentTime = time;
    pause();
    displayClock();
    return currentTime;
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