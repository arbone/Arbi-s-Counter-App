// Selezioniamo gli elementi HTML
const counterElement = document.getElementById("counter");
const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");
const resetButton = document.getElementById("reset");
const progressBar = document.querySelector(".progress-fill");
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    const body = document.body;
    if (window.scrollY > 50) {
        body.classList.add("scrolled");
    } else {
        body.classList.remove("scrolled");
    }
});

// Inizializziamo il counter con valore salvato
let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;

// Funzione per aggiornare il counter e lo sfondo
function updateCounter() {
    counterElement.textContent = counter;
    localStorage.setItem("counter", counter);

    // Cambia colore dello sfondo quando il counter è negativo
    if (counter < 0) {
        document.body.classList.add("negative");
    } else {
        document.body.classList.remove("negative");
    }
}

// Event listener per incrementare
incrementButton.addEventListener("click", function () {
    counter++;
    updateCounter();
});

// Event listener per decrementare
decrementButton.addEventListener("click", function () {
    counter--;
    updateCounter();
});

// Event listener per resettare
resetButton.addEventListener("click", function () {
    counter = 0;
    updateCounter();
});

// Inizializza il counter alla partenza
updateCounter();

// Funzione per calcolare il progresso logaritmico
function calculateProgress(value) {
    return Math.log10(Math.abs(value) + 1) * 20; // Valore massimo teorico: ~60%
}

// Funzione per aggiornare il counter, la barra e l'header
function updateCounter() {
    counterElement.textContent = counter;
    localStorage.setItem("counter", counter);

    // Calcola il progresso usando la formula logaritmica
    let progress = calculateProgress(counter);
    progressBar.style.width = `${progress}%`;

    // Cambia colore dello sfondo, della barra e dell'header
    if (counter < 0) {
        document.body.classList.add("negative");
        progressBar.style.background = "#ff4444"; // Rosso quando negativo
    } else {
        document.body.classList.remove("negative");
        progressBar.style.background = "#4CAF50"; // Verde quando positivo o zero
    }
}