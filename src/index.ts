let words = ['PARCHIS', 'CLUEDO', 'LANGOSTA', 'DOMINICAL', 'ACERO', 'PERFUME', 'MINUTO', 'CANARIAS', 'PASTA ITALIANA', 'ESTACIÓN', 'VIETNAM', 'BARBERO', 'AJEDREZ', 'COMIDA RÁPIDA', 'HELADO', 'CARA', 'FISCAL', 'CARDENAL', 'TROMPETA', 'SOLTERONA', 'DEBER', 'LOS ANGELES', 'PUENTE LEVADIZO', 'OREJERAS', 'PEREGRINO', 'TOCAR', 'MOZART', 'DIADEMA', 'SODA', 'PATO DONALD', 'BUCEAR', 'AIRE', 'PARRILLA', 'LEOPARDO', 'FUERA DE LÍMITE', 'SONAJERO', 'ESCLAVO', 'EMPUJAR', 'REMO', 'SANTO', 'FANTASMA', 'DEBATE', 'SONROJARSE', 'LOBO DE MAR', 'PROPAGANDA', 'LUCES DE NEÓN', 'RAYOS X', 'POSTER', 'SEVILLANAS', 'BATMAN', 'CAFE', 'ATAÚD', 'INVENTOR', 'ESTÚPIDO', 'BALLENA', 'ESTÓMAGO', 'ALGODÓN AZÚCAR', 'VIERNES', 'MALABARISTA', 'BOLA NAFTALINA', 'PLEGAR', 'ALTO'];
let time = Math.floor(Math.random() * (120 - 60) + 60);

let currentIndex = Math.floor(Math.random() * words.length);

let currentTime = time;
let interval = setInterval(() => {
    nextTime();
    displayClock();
}, 1000);
let intervalSound = setInterval(() => {
    if (isIntervalRunning) {
        playSoundBasedOnTime();

    }
}, 1000);
let isIntervalRunning = false;
let isPaused = false;
buttonAction();

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

function displayClock() {
    let seconds = document.getElementById("seconds");
    if (seconds) {
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
    if (currentTime > 45) {
        if (currentTime % 5 === 0 && beepSound) {
            beepSound.play();
            setBackground();
        }
    } else if (currentTime > 30) {
        if (currentTime % 2 === 0 && beepSound) {
            beepSound.play();
            setBackground();
        }
    } else if (currentTime > 15) {
        if (currentTime % 1 === 0 && beepSound) {
            beepSound.play();
            setBackground();
        }
    } else if (currentTime == 0) {
        if (beepSound3) {
            console.log("beepSound3");
            beepSound3.play();
            clearInterval(intervalSound);
            setBackground();
        }
    } else {
        clearInterval(intervalSound);
        if (beepSound && beepSound2) {
            beepSound.play();
            beepSound2.play();
        }
        setBackground();
        intervalSound = setInterval(() => {
            playSoundBasedOnTime();
        }, 500);
    }
}

function setBackground() {
    let body = document.getElementById("body") as HTMLAudioElement;

    if (body) {
        body.classList.remove("bg-gray-800");
        body.classList.add("bg-red-500");

        setTimeout(() => {
            body.classList.remove("bg-red-500");
            body.classList.add("bg-gray-800");
        }, 300);
    }
}

function nextTime() {
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
        clearInterval(intervalSound);
        isIntervalRunning = false;
        isPaused = true;
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
        intervalSound = setInterval(() => {
            if (isIntervalRunning) {
                playSoundBasedOnTime();
            }
        }, 1000);
        isPaused = false;
        updateButtonStyles();
    }
}

function buttonAction(){
    if (isPaused) {
        resume();
    } else {
        pause();
    }
}

function resetClock() {
    time = Math.floor(Math.random() * (120 - 60) + 60);
    currentTime = time;
    pause();
    displayClock();
    removeAlert();
    return currentTime;
}

function updateButtonStyles() {
    const buttonText = document.getElementById("button-word");

    if (isPaused && buttonText) {
        buttonText.innerText = "Iniciar";
    } else if (buttonText) {
        buttonText.innerText = "Pausar";
    }
}

function removeAlert() {
    let alertContainer = document.getElementById("alert-container");
    if (alertContainer) {
        alertContainer.classList.add("hidden");
    }
}


displayWord();
resetClock();