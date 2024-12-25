var words = ['PARCHIS', 'CLUEDO', 'LANGOSTA', 'DOMINICAL', 'ACERO', 'PERFUME', 'MINUTO', 'CANARIAS', 'PASTA ITALIANA', 'ESTACIÓN', 'VIETNAM', 'BARBERO', 'AJEDREZ', 'COMIDA RÁPIDA', 'HELADO', 'CARA', 'FISCAL', 'CARDENAL', 'TROMPETA', 'SOLTERONA', 'DEBER', 'LOS ANGELES', 'PUENTE LEVADIZO', 'OREJERAS', 'PEREGRINO', 'TOCAR', 'MOZART', 'DIADEMA', 'SODA', 'PATO DONALD', 'BUCEAR', 'AIRE', 'PARRILLA', 'LEOPARDO', 'FUERA DE LÍMITE', 'SONAJERO', 'ESCLAVO', 'EMPUJAR', 'REMO', 'SANTO', 'FANTASMA', 'DEBATE', 'SONROJARSE', 'LOBO DE MAR', 'PROPAGANDA', 'LUCES DE NEÓN', 'RAYOS X', 'POSTER', 'SEVILLANAS', 'BATMAN', 'CAFE', 'ATAÚD', 'INVENTOR', 'ESTÚPIDO', 'BALLENA', 'ESTÓMAGO', 'ALGODÓN AZÚCAR', 'VIERNES', 'MALABARISTA', 'BOLA NAFTALINA', 'PLEGAR', 'ALTO'];
var time = Math.floor(Math.random() * (120 - 60) + 60);
var currentIndex = Math.floor(Math.random() * words.length);
var currentTime = time;
var interval = setInterval(function () {
    nextTime();
    displayClock();
}, 1000);
var intervalSound = setInterval(function () {
    if (isIntervalRunning) {
        playSoundBasedOnTime();
    }
}, 1000);
var isIntervalRunning = false;
function displayWord() {
    var wordDisplay = document.getElementById("word-display");
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
function showAlert(message) {
    var alertContainer = document.getElementById("alert-container");
    var alertMessage = document.getElementById("alert-message");
    if (alertContainer && alertMessage) {
        alertMessage.innerText = message;
        alertContainer.classList.remove("hidden");
    }
}
function displayClock() {
    var seconds = document.getElementById("seconds");
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
    }
    else {
        currentIndex = 0;
    }
}
function playSoundBasedOnTime() {
    var beepSound = document.getElementById("beep-sound");
    var beepSound2 = document.getElementById("beep-sound2");
    var beepSound3 = document.getElementById("beep-sound3");
    var body = document.getElementById("body");
    if (currentTime > 45) {
        if (currentTime % 5 === 0 && beepSound) {
            beepSound.play();
        }
    }
    else if (currentTime > 30) {
        if (currentTime % 2 === 0 && beepSound) {
            beepSound.play();
        }
    }
    else if (currentTime > 15) {
        if (currentTime % 1 === 0 && beepSound) {
            beepSound.play();
        }
    }
    else if (currentTime == 0) {
        if (beepSound3) {
            console.log("beepSound3");
            beepSound3.play();
            /*clear interval*/
            clearInterval(intervalSound);
        }
    }
    else {
        clearInterval(intervalSound);
        if (beepSound && beepSound2) {
            beepSound.play();
            beepSound2.play();
        }
        if (body) {
            body.classList.remove("bg-blue-300");
            body.classList.add("bg-red-500");
            setTimeout(function () {
                body.classList.remove("bg-red-500");
                body.classList.add("bg-blue-300");
            }, 300);
        }
        intervalSound = setInterval(function () {
            playSoundBasedOnTime();
        }, 500);
    }
}
function nextTime() {
    if (currentTime > 0) {
        return currentTime--;
    }
    else {
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
        updateButtonStyles();
    }
}
function resume() {
    if (!isIntervalRunning) {
        interval = setInterval(function () {
            nextTime();
            displayClock();
        }, 1000);
        isIntervalRunning = true;
        intervalSound = setInterval(function () {
            if (isIntervalRunning) {
                playSoundBasedOnTime();
            }
        }, 1000);
        updateButtonStyles();
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
    var startButton = document.getElementById("start");
    var pauseButton = document.getElementById("pause");
    if (isIntervalRunning) {
        if (startButton) {
            startButton.classList.remove("bg-blue-500");
            startButton.classList.add("bg-gray-600");
        }
    }
    else {
        if (startButton) {
            startButton.classList.remove("bg-black");
            startButton.classList.add("bg-blue-500");
        }
    }
}
function removeAlert() {
    var alertContainer = document.getElementById("alert-container");
    if (alertContainer) {
        alertContainer.classList.add("hidden");
    }
}
displayWord();
resetClock();
